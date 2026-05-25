# AtlasInference Jekyll Site

A Jekyll version of the AtlasInference static site with the original visual design preserved and a blog added.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Blog posts

Add Markdown files to `_posts/` using the format:

```text
YYYY-MM-DD-post-title.md
```

Each post should include front matter similar to:

```yaml
---
layout: post
title: "Post Title"
description: "Short summary."
tags: [inference, evaluation]
---
```

## GitHub Pages

This site uses GitHub Pages-compatible plugins:

- `jekyll-feed`
- `jekyll-sitemap`
- `jekyll-seo-tag`

Update `_config.yml` if the production domain changes.
