import sys


if __name__ == "__main__":
    with open('.env', 'w') as f:
        for i in sys.argv[1].split(";"):
            f.write("%s\n" % i)
