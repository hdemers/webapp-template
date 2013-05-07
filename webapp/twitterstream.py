import os
from twitter import TwitterStream, OAuth


def with_coordinates():
    """Yield tweets that are geolocated, i.e. their `coordinates` field is
    non-empty. This is a generator function.
    """
    stream = TwitterStream(auth=_get_auth())
    for tweet in stream.statuses.filter(locations="-180,-90,180,90"):
        if 'coordinates' in tweet and tweet['coordinates']:
            yield tweet


def _get_auth():
    """Return a OAuth object with credentials taken from the environment."""
    consumer_key = os.environ['TWITTER_CONSUMER_KEY']
    consumer_secret = os.environ['TWITTER_CONSUMER_SECRET']
    access_token = os.environ['TWITTER_ACCESS_TOKEN']
    access_token_secret = os.environ['TWITTER_ACCESS_TOKEN_SECRET']

    return OAuth(access_token, access_token_secret,
                 consumer_key, consumer_secret)
