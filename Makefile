add: 
	deno run --unstable --allow-write --allow-read src/app.ts add

list:
	deno run --unstable --allow-read src/app.ts list

read:
	deno run --unstable --allow-read src/app.ts read

update:
	deno run --unstable --allow-write --allow-read src/app.ts update

remove:
	deno run --unstable --allow-write --allow-read src/app.ts remove