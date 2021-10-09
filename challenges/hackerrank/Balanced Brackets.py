#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'isBalanced' function below.
#
# The function is expected to return a STRING.
# The function accepts STRING s as parameter.
#
def isBalanced(s):
    #helpful
    closingBrackets = [ "}", ")", "]" ]
    openingBrackets = [ "{", "(", "[" ]
    bracketDict = {"{" : "}", "}" : "{", "[" : "]", "]" : "[", "(" : ")", ")" : "(" }

    #memory
    openBracketList = []

    for bracket in s:
        if bracket in openingBrackets:
            openBracketList.append(bracket)
        else:
            if(len(openBracketList) == 0):
                return "NO"
            lastOpenedBracket = openBracketList.pop()
            if(bracketDict[bracket] != lastOpenedBracket):
                return "NO"

    if(len(openBracketList) != 0):
         return "NO"

    return "YES"







if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    t = int(input().strip())

    for t_itr in range(t):
        s = input()

        result = isBalanced(s)

        fptr.write(result + '\n')

    fptr.close()
