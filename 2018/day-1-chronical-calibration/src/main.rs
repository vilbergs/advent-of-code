use std::fs;

/**
 *
*/
fn main() {
    println!("Part one - {}", part_one());
    println!("Part two - {}", part_two());
}

fn part_one() -> i64 {
    let operations = load_input();

    let result = operations.into_iter().fold(0, |total, num| total + num);

    result
}

fn part_two() -> i64 {
    // get sum of last two numbers
    // check if next sum is a match
    // if I get to the end of input then start over
    let input = load_input();

    let mut seen_numbers: Vec<i64> = vec![0];
    let mut current_index = 0;
    let mut num = 0;

    println!("{:?}", input);

    loop {
        if current_index > input.len() - 1 {
            current_index = 0;
        }

        let current_num = input[current_index];
        let next_sum = seen_numbers.last().copied().unwrap() + current_num;
        if seen_numbers.contains(&next_sum) {
            num = next_sum;
            break;
        } else {
            seen_numbers.push(next_sum);
        }

        current_index += 1
    }

    num
}

fn load_input() -> Vec<i64> {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong");

    let parts = contents
        .trim()
        .split('\n')
        .map(|s| s.to_string().parse::<i64>().unwrap())
        .collect();

    parts
}
