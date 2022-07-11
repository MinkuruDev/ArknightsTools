import csv
import json
import pandas as pd
import os

months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}

srcData = os.path.join("WriteData", "data.xlsx")
tempData = os.path.join("WriteData", "temp.csv")
resData = os.path.join("src", "js", "operators.js")

def main():
    # read xlsx file
    read_file = pd.read_excel (srcData)
    read_file.to_csv (tempData, index = None, header=True)
    csv_file = open(tempData, 'r')
    csv_reader = csv.reader(csv_file)
    data = list(csv_reader)
    csv_file.close()
    os.remove(path=tempData)

    js_file = open(resData, 'w')
    props = data[0]

    # write data to js file
    js_file.write("const operators = {\n")
    l = len(data)
    for i in range(1, l):
        op = {}
        row = data[i]
        for j in range(len(props)):
            op[props[j]] = row[j]

        day = op["dateOfBirth"]
        if (day != "Unknown") and (day != "Undisclosed"):
            date = day.split(" ")[0].split("-")
            op["dateOfBirth"] = months[int(date[1])] + " " + date[2]

        js_file.write('\t"{}": {}'.format(op[props[0]], json.dumps(op)))
        js_file.write(",\n")

    js_file.write("}\n")
    js_file.close()

if __name__ == "__main__":
    main()