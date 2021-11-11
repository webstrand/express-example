import fs from 'fs';
import express from 'express';
const app = express()
const port = 3000

app.get("/", (req, res) => {
	const message = req.query.message;
	if(message !== undefined && typeof message !== "string") throw new Error("got weird message");
	if(message !== undefined) write(message);
	res.send(render(message));
})

function render(lastMessage?: string) {
	return`
		<form method="get" >
			<input type="text" name="message">
			<button type="submit">Send!</button>
		</form>
	` + (lastMessage != null ? `
		<p>Wrote your message ${lastMessage}</p>
	` : '');
}

function write(message: string) {
	fs.writeFile(
		"Output.txt",
		message + "\n",
		{flag: "a"},
		err => {
			if (err) throw err
		}
	);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
