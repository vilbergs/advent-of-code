use std::fs;

enum Direction {
    Forward,
    Up,
    Down,
}

fn main() {
    println!("Part One: {}", part_one());
    println!("Part Two: {}", part_two());
}

fn part_one() -> i32 {
    let input = load_input();
    let mut horizontal = 0;
    let mut depth = 0;

    for (pos, dir) in input {
        match pos {
            Direction::Forward => horizontal += dir,
            Direction::Down => depth += dir,
            Direction::Up => depth -= dir,
        }
    }

    horizontal * depth
}

fn part_two() -> i32 {
    let input = load_input();
    let mut horizontal = 0;
    let mut depth = 0;
    let mut aim = 0;

    for (pos, dir) in input {
        match pos {
            Direction::Down => aim += dir,
            Direction::Up => aim -= dir,
            Direction::Forward => {
                horizontal += dir;
                depth += aim * dir;
            }
        }
    }

    horizontal * depth
}

fn load_input() -> Vec<(Direction, i32)> {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong");

    let parts = contents
        .trim()
        .lines()
        .map(|s| {
            let mut pos_and_dir = s.split(" ");
            let raw_pos = pos_and_dir.next().unwrap();

            let pos = match raw_pos {
                "forward" => Direction::Forward,
                "up" => Direction::Up,
                "down" => Direction::Down,
                _ => panic!("Unknown Direction"),
            };

            (pos, pos_and_dir.next().unwrap().parse::<i32>().unwrap())
        })
        .collect();

    parts
}
