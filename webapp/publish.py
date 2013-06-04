from cloudly.pubsub import Pusher
from cloudly.tweets import Tweets
from cloudly.twitterstream import Streamer

from webapp import config


class Publisher(Pusher):
    def publish(self, tweets, event):
        """Keep only relevant fields from the given tweets."""
        stripped = []
        for tweet in tweets:
            stripped.append({
                'coordinates': tweet['coordinates'],
            })
        super(Publisher, self).publish(stripped, event)


def processor(tweet):
    return True


def start():
    # This trick of importing the current module is for RQ workers to
    # correctly unpickle the `processor` function.
    from webapp import publish

    pubsub = publish.Publisher.open(config.pubsub_channel)
    streamer = Streamer(publish.processor, pubsub=pubsub, is_queuing=True,
                        cache_length=100)

    tweets = Tweets()
    streamer.run(tweets.with_coordinates())


if __name__ == "__main__":
    start()
