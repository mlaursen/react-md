# New Documentation Site

- Implement a better search
  - probably do a modal search instead of a list to show more results and
    context
  - find a better indexer instead of trying to do it manually
  - https://www.algolia.com/
    - I get about 10k searches per month
    - 10 search terms though, whatever that is
- apparently people want copy/paste for code
- always have simple examples
- move to component based documentation instead of package based
- figure out how to get the typescript interfaces and props available
- each package's README should show a minimal setup with including styles and
  any context providers
- might be nice to support selecting line numbers in the demos, but that is
  taken care of by using the GitHub links
- the SassDoc should be much more condensed
  - variables should probably be displayed in a table
  - mixins and functions are probably fine. I should just make sure they always
    have an example
    - start with examples before showing the source code
    - maybe lazy-load the compiled examples?
- I think I'd like to implement the prefers-color-scheme by default, but might
  require adding that feature first
  - default to System, but allow light and dark
- Add quick nav item to Theme Builder in main AppBar
