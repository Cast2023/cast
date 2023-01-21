import sys


with open('.testenv', 'w') as f:
    for i in sys.argv[1].split(";"):
        f.write("%s\n" % i)
