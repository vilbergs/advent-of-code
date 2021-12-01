use std::fs;

fn main() {
    day_one();
    let d_two = day_two(&load_input());

    println!("Day two answer: {}", d_two)
}

fn day_two(input: &Vec<String>) -> String {
    let mut answer = String::from("");

    for id_a in input {
        if answer.len() > 0 {
            break;
        }

        for id_b in input {
            let diff = diff_ids(id_a, id_b);

            if diff.len() == 1 {
                answer = id_a.to_string();
                answer.remove(diff[0]);
                println!("{} - {} = {}", id_a, id_b, answer);

                break;
            } else {
                answer = String::from("")
            }
        }
    }

    answer
}

fn diff_ids(a: &String, b: &String) -> Vec<usize> {
    let a_chars = a.chars();

    if a.len() != b.len() {
        panic!("Strings nit equal lengths, this won't work")
    }

    let mut different = Vec::new();

    for (index, value) in a_chars.enumerate() {
        let b_val = match b.chars().nth(index) {
            Some(val) => val,
            None => panic!("HEllo!!!"),
        };

        if b_val != value {
            different.push(index)
        }
    }

    different
}

fn day_one() {
    println!("Hello, world!");

    let input = load_input();

    let mut two_count = 0;
    let mut three_count = 0;

    for id in input {
        let chars: Vec<char> = id.chars().collect();
        let mut counted_three = false;
        let mut counted_two = false;

        for letter in chars {
            if counted_three && counted_two {
                break;
            }

            let char_count = id.matches(letter).count();

            if !counted_three && char_count == 3 {
                three_count += 1;

                counted_three = true;
            } else if !counted_two && char_count == 2 {
                two_count += 1;

                counted_two = true;
            }
        }
    }

    println!("Checksum is: {}", three_count * two_count)
}

fn load_input() -> Vec<String> {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong");

    contents.trim().lines().map(|s| s.to_string()).collect()
}
