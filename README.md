<br/>
<div align="center">
<a href="https://www.henrihuuskonen.dev/">
<img src="https://www.henrihuuskonen.dev/henri-huuskonen-avatar.svg" alt="Logo" width="200" height="200">
</a>
<p align="center">
My personal website / linktree

<br/>
<br/>
<a href="https://www.henrihuuskonen.dev/">Visit the site</a>  -
<a href="https://github.com/henrihuuskonen/henrihuuskonen/issues/new?labels=bug&template=bug-report---.md">Report Bug</a> -
<a href="https://github.com/henrihuuskonen/henrihuuskonen/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
</p>
</div>


## Built With

- [Next](https://nextjs.org)
- [React](https://reactjs.org)
- [Vercel](https://vercel.com/)
- [Playwright](https://playwright.dev/)
## Getting Started

Follow these steps to get the app running for you locally:
### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

- asdf
  ```
  https://asdf-vm.com/guide/getting-started.html
  ```

- install right nodejs version
  ```sh
  asdf install
  ```
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/henrihuuskonen/henrihuuskonen
   ```
2. Install dependencies
   ```sh
   npm install
   ```
## Usage

```sh
# start the project in dev mode
npm run dev

# run tests
npm run test
```

## Testing

The app is tested with Playwright. To run the tests:
```sh
# install browsers
npx playwright install

# run the tests
npm run test
```

The frontend is "protected" with visual regression testing, which are run in CI under [playwright-tests step](https://github.com/henrihuuskonen/henrihuuskonen.dev/blob/main/.github/workflows/ci.yaml#L21).

If the job fails on the visual regression test, updated snapshots are saved under the jobs artifacts for easy updating.

## License

Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for more information.

## Contact

Henri Huuskonen - mail@henrihuuskonen.dev
