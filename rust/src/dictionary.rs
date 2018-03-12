use std::collections::HashMap;

#[derive(Debug)]
pub struct Dictionary {
    table: HashMap<String, usize>,
    index: usize
}

impl Dictionary {
    pub fn new () -> Self {
        Dictionary {
            table: HashMap::new(),
            index: 0
        }
    }

    pub fn compress (&mut self, source: &String) -> Vec<usize> {
        // init
        source.chars().for_each(|key| {
            if !self.table.contains_key(&key.to_string()) {
                self.index += 1;

                self.table.insert(key.to_string(), self.index);
            }
        });

        // process start
        let mut key = source[0..1].to_string();
        let mut result = vec![];

        source.chars().skip(1).for_each(|chr| {
            key.push(chr);

            if !self.table.contains_key(&key) {
                self.index += 1;

                let code = self.table.len() + 1;
                self.table.insert(key.to_string(), code);

                key.pop();
                match self.table.get(&key) {
                    None => panic!("으어어"),
                    Some(code) => {
                        result.push(code.clone());
                        key.clear();
                        key.push(chr);
                    }
                };
            }
        });

        // reset
        self.index = 0;
        self.table.clear();

        result
    }
}
