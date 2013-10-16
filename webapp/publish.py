import gevent

from cloudly.pubsub import RedisWebSocket
from cloudly.tweets import Tweets, StreamManager, keep
from cloudly import logger

from webapp import config

log = logger.init(__name__)
pubsub = RedisWebSocket(config.pubsub_channel)
pubsub.spawn()
running = False


def processor(tweets):
    pubsub.publish(keep(['coordinates'], tweets), "tweets")
    return len(tweets)


def run():
    log.info("Starting Twitter stream manager.")
    streamer = StreamManager('locate', processor, is_queuing=False)
    tweets = Tweets()
    streamer.run(tweets.with_coordinates(), stop)
    log.info("Twitter stream manager has stopped.")


def start():
    global running
    if not running:
        running = True
        gevent.spawn(run)


def subscribe(websocket):
    log.info("Subscribed a new websocket client.")
    pubsub.register(websocket)


def stop():
    global running
    if len(pubsub.websockets) == 0:
        log.info("Stopping Twitter stream manager.")
        running = False
        return True
    return False
