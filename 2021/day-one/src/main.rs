use std::fs;

fn main() {
    println!("Part one: {}", part_one())
}

fn part_one() -> i32 {
    let input = load_input();
    let mut increases = 0;

    let chunks: Vec<&[i32]> = input.windows(3).collect();

    for (index, depth_window) in chunks.iter().enumerate() {
        if index == 0 {
            continue;
        }

        let sum_a: i32 = chunks[index - 1].iter().sum();
        let sum_b: i32 = depth_window.iter().sum();

        if sum_b - sum_a > 0 {
            increases += 1;
        }
    }

    increases
}

fn load_input() -> Vec<i32> {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong");

    let parts = contents
        .trim()
        .lines()
        .map(|s| s.to_string().parse::<i32>().unwrap())
        .collect();

    parts
}
