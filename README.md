### dasfaust.me
The source code to my personal website

Uses Next.js/React to build pages with data served by Strapi. Also uses MDXRemote to allow React components insite an article. Theming is done with TailwindCSS.

### Running
Uses a default install of Strapi 4.0.0, which is not included in this repo. The Strapi content types look like this:

```
collections:
	tags:
		content: text
		color: text
		projects: relation - 'has many and belongs to many' tags
		verb: text
	project:
		blurb: text
		content: rich text
		cover: single image media
		tags: relation - 'has many and belongs to many' projects
		year: number
		title: text
		url: text
		github: text
```

Clone the repo
`git clone https://github.com/Dasfaust/dasfaust.me.git`

Change the Strapi URL in `next.config.js`

Run!
`npm run [dev, start]`
