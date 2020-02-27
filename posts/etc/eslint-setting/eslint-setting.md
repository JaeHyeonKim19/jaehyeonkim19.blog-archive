---
title: 'VSCODE에서 ESLint와 Prettier 세팅하기(aribnb)'
date: 2019-10-08 08:26:28 -0400
path: 'etc/20191008eslint_setting'
---

1. vscode에서 ESLint와 Prettier extension 다운받기
2. 프로젝트 루트 디렉토리에 다음 명령어로 라이브러리 설치하기 `npm install -D eslint prettier`
3. 에어비엔비 config를 설치하자. npm5+를 사용중이면 다음 명령어를 실행하자.`npx install-peerdeps --dev eslint-config-prettier eslint-plugin-prettier`
4. eslint-config-prettier와 eslint-plugin-prettier를 다음의 명령어로 설치한다. `npm install -D eslint-config-prettier eslint-plugin-prettier`
5. `.eslintrc.json`파일을 프로젝트의 루트디렉토리에 생성하고 다음 내용을 입력한다.

```
{
    "extends": ["airbnb", "prettier"],
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": ["error"]
    }
}
```

6. `.prettierrc`파일을 프로젝트의 루트디렉토리에 생성하고 다음 내용을 입력한다.

```
{
    "printWidth": 100,
    "singleQuote": true
}
```

7. vscode user setting에서 `"editor.formatOnSave": true`로 설정한다.
8. 개인 옵션에 따라 설정파일을 다르게 설정하자. 필자의 최종 설정 값은 다음과 같다

#### .eslintrc.json

```
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  },
  "env": {
    "browser": true
  }
}

```

#### .prettierrc

```
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}

```

위 `.prettierrc`에 설정된 내용은 다음과 같다.

- 문자열을 사용 할 때에는 ' 를 사용합니다.
- 코드는 ; 로 끝나야합니다.
- 탭 대신에 스페이스를 사용합니다.
- 들여쓰기 크기는 2칸입니다.
- 객체나 배열을 작성 할 때, 원소 혹은 key-value 의 맨 뒤에있는 것에도 쉼표를 붙입니다.
- 한 줄이 80칸이 넘지 않도록 합니다
