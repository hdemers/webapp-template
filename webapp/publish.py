from cloudly import pushers

from webapp import twitterstream


if __name__ == "__main__":

    for tweet in twitterstream.with_coordinates():
        pushers.publish("tweets", "tweet", tweet)
