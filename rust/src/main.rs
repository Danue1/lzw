mod dictionary;

fn main () {
    use self::dictionary::Dictionary;

    let mut map = Dictionary::new();
    let source = read_source();
    let result = map.compress(&source);

    println!("{:?}", result);
}

#[inline]
fn read_source () -> String {
    let source = "ABABBABCABABBA";

    source.to_string()
}
