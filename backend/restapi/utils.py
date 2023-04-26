import random
import string


def generate_token():
    token_length = 64
    chars = string.ascii_lowercase + \
        string.ascii_uppercase + \
        string.digits
    token = ''.join(random.choice(chars) for each in range(token_length))
    return token