from cloudly.pubsub import Pusher
from cloudly.tweets import Tweets, StreamManager, keep

from webapp import config

pubsub = Pusher(config.pubsub_channel)


def processor(tweets):
    pubsub.publish(keep(['coordinates'], tweets), "tweets")
    return len(tweets)


def start():
    streamer = StreamManager('locate', processor, is_queuing=False)
    tweets = Tweets()
    streamer.run(tweets.with_coordinates())


if __name__ == "__main__":
    start()
