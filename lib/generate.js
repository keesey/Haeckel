if (process.argv.length !== 1 || !process.argv[0]) {
    process.stderr.write('Usage: node generate <filename>\n');
    process.exit(1);
}
