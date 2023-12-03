f = open("./input.txt", "r")

input = f.read().split("\n")
sum = 0


for line in input:
    first = next((char for char in line if char.isnumeric()), None)
    last = next((char for char in reversed(line) if char.isnumeric()), None)

    num = f"{first if first else ''}{last if last else ''}"

    sum += int(num if num else 0)

print(sum)
