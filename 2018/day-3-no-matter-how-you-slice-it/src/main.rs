use std::fs;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum Cell {
    Overlapped,
    Occupied,
    Empty,
}

struct Rect {
    offset_left: usize,
    offset_top: usize,
    width: usize,
    height: usize,
}

struct Plane {
    width: usize,
    height: usize, // Height is never used but I'll keep it for sanity's sake
    cells: Vec<Cell>,
}

impl Plane {
    fn new() -> Self {
        // "The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side."
        let width = 1000;
        let height = 1000;

        let cells = (0..width * height).map(|_| Cell::Empty).collect();

        Self {
            width,
            height,
            cells,
        }
    }

    pub fn add_rect(&mut self, rect: &Rect) {
        let mut next = self.cells.clone();

        for row in 0..rect.height {
            for col in 0..rect.width {
                let current_cell_index =
                    self.get_index_at_point(row + rect.offset_top, col + rect.offset_left);

                let next_cell = match next[current_cell_index] {
                    Cell::Empty => Cell::Occupied,
                    Cell::Occupied => Cell::Overlapped,
                    Cell::Overlapped => Cell::Overlapped,
                };

                next[current_cell_index] = next_cell;
            }
        }

        self.cells = next
    }

    fn get_index_at_point(&self, row: usize, col: usize) -> usize {
        row * &self.width + col
    }
}

fn main() {
    println!("{}", day_one());
}

fn day_one() -> usize {
    let mut plane = Plane::new();
    let rects = load_input();

    for rect in rects {
        plane.add_rect(&rect);
    }

    let filt = plane.cells.iter().filter(|&s| *s == Cell::Overlapped);

    filt.count()
}

fn load_input() -> Vec<Rect> {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong");
    contents
        .trim()
        .lines()
        .map(|s| {
            let parts: Vec<&str> = s
                .split(&['#', ' ', '@', ',', ':', 'x'][..])
                .into_iter()
                .filter(|&s| s != "")
                .collect();

            Rect {
                offset_left: parts[1].parse::<usize>().unwrap(),
                offset_top: parts[2].parse::<usize>().unwrap(),
                width: parts[3].parse::<usize>().unwrap(),
                height: parts[4].parse::<usize>().unwrap(),
            }
        })
        .collect()
}
