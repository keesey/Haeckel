///<reference path='../bower_components/dt-node/node.d.ts' />
///<reference path='haeckel.d.ts' />

if (process.argv.length !== 1 || !process.argv[0])
{
	process.stderr.write('Usage: node generate <figure filename>');
	process.exit(1);
}

