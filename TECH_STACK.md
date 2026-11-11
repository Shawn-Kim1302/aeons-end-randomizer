# Aeons End Randomizer 기술 스택 정리

이 문서는 이 프로젝트를 처음 보는 사람을 위해, 어떤 기술이 어디에 쓰이는지 정리한 것이에요.
버전은 이 저장소의 `node_modules`에 실제로 설치된 버전 기준이에요.

---

## 한눈에 보기

이 앱은 **브라우저에서만 돌아가는 웹앱(SPA, Single Page Application)** 이에요.

- 서버도, 데이터베이스도 없어요. 모든 코드가 사용자 브라우저 안에서 실행돼요.
- 카드 데이터는 코드 안에 들어 있고, 사용자 설정과 원정 기록은 브라우저 저장소에 저장돼요.
- 그래서 빌드 결과(HTML·JS·CSS 파일 묶음)를 GitHub Pages 같은 정적 호스팅에 올리기만 하면 돼요.

| 역할               | 기술                               | 버전             |
| ------------------ | ---------------------------------- | ---------------- |
| 언어               | TypeScript                         | 4.3.5            |
| 화면               | React                              | 17.0.2           |
| UI 부품            | Material-UI (`@material-ui/core`)  | 3.9.4            |
| 스타일             | styled-components, react-jss       | 5.3.0, 8.6.1     |
| 상태 관리          | Redux, react-redux                 | 4.1.1, 7.2.4     |
| 부수 효과 처리     | redux-loop                         | 6.1.0            |
| 상태 조회          | reselect                           | 4.0.0            |
| 화면 이동          | react-router-dom                   | 5.2.0            |
| 브라우저 저장      | idb-keyval (IndexedDB)             | 3.2.0            |
| 재현 가능한 무작위 | seedrandom                         | 3.0.5            |
| 화면 문구 번역     | i18next, react-i18next             | 21.10.0, 11.18.6 |
| 빌드 도구          | Create React App (`react-scripts`) | 4.0.3            |
| 패키지 관리        | Yarn (classic)                     | 1.22             |
| 단위 테스트        | Jest (CRA 내장)                    | -                |
| 화면 테스트        | Cypress                            | 13.3.0           |
| 코드 정리          | Prettier + husky                   | 2.x, 4.x         |
| 배포               | GitHub Actions → GitHub Pages      | -                |

---

## 1. 언어: TypeScript

**무엇인가:** JavaScript에 "타입"을 붙인 언어예요. `name: string`, `cost: number`처럼 값의 종류를 적어두면, 실행하기 전에 실수를 잡아줘요.

**이 프로젝트에서:**

- 앱 코드 전체가 `.ts`(로직)와 `.tsx`(화면, React 컴포넌트) 파일이에요.
- 카드·마법사·원정 같은 데이터 모양은 `src/aer-types/types/`에 정의돼 있어요.
  - `data.ts`: 카드, 마법사, 네메시스, 확장
  - `expeditions.ts`: 원정, 전투, 보상
  - `market.ts`: 공급처 구성
  - `turnOrder.ts`: 턴 순서 카드
  - `settings.ts`: 설정
- 설정 파일은 `tsconfig.json`이에요. `baseUrl`이 `./src`라서 `import ... from 'components/...'`처럼 `src` 기준 경로로 불러올 수 있어요.

**알아둘 점:**

- 브라우저는 TypeScript를 직접 실행하지 못해요. 빌드 도구가 JavaScript로 변환해서 실행해요.
- 타입만 검사하려면 `node node_modules/typescript/bin/tsc --noEmit -p .`를 실행하세요. 기존 테스트 파일(`__test__`)에서 나는 에러 몇 개는 원래부터 있던 거예요.

---

## 2. 화면: React 17

**무엇인가:** 화면을 "컴포넌트"라는 작은 블록으로 나눠 조립하는 라이브러리예요. 컴포넌트는 데이터(props)를 받아서 화면 조각을 돌려주는 함수예요.

```tsx
// 예시: 라벨과 값을 한 줄로 보여주는 컴포넌트
const InfoItem = ({ label, info }) => (
  <p>
    <b>{label}:</b> {info}
  </p>
)
```

`.tsx` 파일 안의 `<p>...</p>` 같은 HTML 비슷한 문법을 **JSX**라고 해요.

**이 프로젝트의 컴포넌트 구조 (`src/components/`):**

"아토믹 디자인"이라는 방식으로, 작은 것부터 큰 것 순서로 폴더를 나눠요.

| 폴더         | 의미                      | 예시                                             |
| ------------ | ------------------------- | ------------------------------------------------ |
| `atoms/`     | 더 쪼갤 수 없는 기본 조각 | 제목(H1, H2), 문단(P), 링크(A), 셔플 버튼        |
| `molecules/` | atoms를 조합한 부품       | 카드 타일, 정보 한 줄(InfoItem), 모달, 하단 탭   |
| `organisms/` | 화면의 큰 영역            | 상단바(TopBar), 왼쪽 메뉴(DrawerMenu), 본문 영역 |
| `pages/`     | 화면 하나 전체            | 랜덤 뽑기, 턴 순서, 원정, 설정, 정보             |
| `App/`       | 앱 최상단                 | 테마, 라우터, 전체 레이아웃                      |

**`pages/` 화면 목록:**

- `Randomizer/`: 네메시스, 기본 네메시스 카드, 마법사, 공급처, 아군/적 뽑기
- `TurnOrder/`: 턴 순서 덱 시뮬레이션
- `Expeditions/`: 원정(캠페인) 만들기와 진행
- `Settings/`: 확장 선택, 공급처 구성, 언어
- `About/`: 앱 소개

**자주 보이는 React 기능:**

- `React.memo(컴포넌트)`: props가 그대로면 다시 그리지 않아서 성능을 아껴요.
- `useState`, `useCallback`, `useEffect`: 컴포넌트 안에서 상태를 갖거나 동작을 정의하는 "훅(hook)"이에요.
- 직접 만든 훅은 `src/hooks/`에 있어요.
  - `useModal.tsx`: 팝업창 열기/닫기
  - `useExpansionHandling.tsx`: 접었다 펴는 패널 상태

---

## 3. UI 부품과 스타일

### Material-UI v3

**무엇인가:** 구글 "머티리얼 디자인" 스타일의 완성된 부품(버튼, 체크박스, 드롭다운, 카드, 메뉴, 다이얼로그) 모음이에요.

**이 프로젝트에서:** `import Button from '@material-ui/core/Button'`처럼 가져다 써요. 체크박스 목록, 설정 드롭다운, 왼쪽 메뉴가 전부 Material-UI예요.

**알아둘 점:** v3는 2019년경 버전이라 많이 오래됐어요. 현재 이름은 MUI(v5 이상)예요. 그래서 인터넷 예제가 이 코드와 다를 수 있어요.

### styled-components

**무엇인가:** CSS를 컴포넌트 코드 안에 같이 쓰는 방식이에요.

```tsx
const Wrapper = styled.div`
  margin: 16px;
  color: #333;
`
```

**이 프로젝트에서:** 여백, 색, 크기 같은 세부 모양을 거의 다 이걸로 정해요. 폴더 안에 `Wrapper.tsx`, `__styled__/` 같은 파일이 보이면 대부분 스타일 정의예요. 앱 공통 색상과 테마는 `src/mainTheme.ts`에 있어요.

### react-jss

Material-UI v3가 내부적으로 쓰는 스타일 도구예요. 직접 만질 일은 거의 없어요. `src/index.tsx`에서 초기 설정만 해요.

---

## 4. 상태 관리: Redux

### 상태(state)란?

"지금 앱이 기억하고 있는 데이터"예요. 예를 들면 이런 것들이에요.

- 어떤 확장을 켜뒀는지
- 방금 뽑은 네메시스와 마법사가 누구인지
- 원정이 몇 번째 전투까지 진행됐는지

### Redux

**무엇인가:** 이런 공용 데이터를 **스토어(store)** 한곳에 모아두고, 정해진 방식으로만 바꾸게 하는 라이브러리예요.

데이터가 바뀌는 흐름은 항상 같아요.

```
버튼 클릭
  → 액션(action) 발생: "마법사 4명 뽑아줘"
  → 리듀서(reducer): 현재 상태 + 액션 → 새 상태 계산
  → 스토어 갱신
  → 그 데이터를 쓰는 화면이 자동으로 다시 그려짐
```

**이 프로젝트의 구조 (`src/Redux/`):**

| 경로                 | 내용                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| `configureStore.ts`  | 스토어 생성. 개발 중에는 Redux DevTools 브라우저 확장과 연결돼요.         |
| `Store/index.ts`     | 모든 영역을 하나로 합치는 곳 (RootReducer, actions, selectors)            |
| `Store/Settings/`    | 확장 선택, 카드별 사용 여부, 언어, 공급처 구성                            |
| `Store/Randomizer/`  | 뽑기 결과: `Nemesis`, `Mages`, `Supply`, `BasicNemesisCards`, `FriendFoe` |
| `Store/TurnOrder/`   | 턴 순서 덱 상태                                                           |
| `Store/Expeditions/` | 원정 목록과 진행 상황, 원정 방식(`Variants.ts`)                           |
| `Store/Snackbars/`   | 화면 아래에 잠깐 뜨는 알림 메시지                                         |

각 영역 폴더에는 보통 이런 파일이 있어요.

- `actions` / `index.ts`: 어떤 액션이 있는지
- `reducer.ts`: 상태를 어떻게 바꾸는지
- `selectors.ts`: 상태에서 값을 꺼내는 함수
- `reducerHelpers/`: 리듀서가 쓰는 세부 로직
- `__test__/`: 테스트

**컴포넌트와 연결:** `react-redux`의 `connect(mapStateToProps, mapDispatchToProps)(컴포넌트)` 패턴을 써요.

- `mapStateToProps`: 스토어에서 필요한 값을 꺼내 props로 넣어줘요.
- `mapDispatchToProps`: 액션을 보내는 함수를 props로 넣어줘요.

### redux-loop

**무엇인가:** 리듀서 안에서 "저장하기" 같은 **부수 효과**를 다음 할 일(Cmd)로 예약할 수 있게 해줘요. 원래 Redux 리듀서는 계산만 해야 해서, 저장 같은 일은 따로 처리해야 하거든요.

**이 프로젝트에서:** 원정을 만들거나 진행하면 리듀서가 새 상태를 만들면서 동시에 "IndexedDB에 저장" 명령을 함께 돌려줘요. `configureStore.ts`의 `install()`이 이걸 켜는 부분이에요.

### reselect

상태에서 값을 계산해서 꺼낼 때, 입력이 같으면 이전 결과를 재사용(메모이제이션)해요. 각 폴더의 `selectors.ts`에서 써요.

---

## 5. 화면 이동: React Router v5

**무엇인가:** 주소창의 경로에 따라 다른 화면을 보여줘요. 실제로 페이지를 새로 불러오는 게 아니라, JavaScript가 화면만 바꿔요.

**이 프로젝트의 주요 경로:**

| 경로                                    | 화면                    |
| --------------------------------------- | ----------------------- |
| `/randomizer/nemesis`                   | 네메시스 뽑기 (첫 화면) |
| `/randomizer/basic-nemesis-cards`       | 기본 네메시스 카드      |
| `/randomizer/mages`                     | 마법사 뽑기             |
| `/randomizer/supply`                    | 공급처 만들기           |
| `/randomizer/friendfoe`                 | 아군/적                 |
| `/turnorder`                            | 턴 순서                 |
| `/expeditions`, `/expeditions/:id`      | 원정 목록, 원정 상세    |
| `/settings`, `/settings/expansions/:id` | 설정, 확장별 세부 설정  |
| `/about`                                | 정보                    |

**관련 파일:**

- 경로 정의: `src/components/organisms/Content/Routing.tsx`
- 상단 제목 표시: `src/components/organisms/TopBar/index.tsx`

**GitHub Pages 관련:** 사이트가 `https://아이디.github.io/aeons-end-randomizer/` 아래에 올라가요. 그래서 `App/index.tsx`의 라우터에 `basename={process.env.PUBLIC_URL}`을 넣어 `/aeons-end-randomizer`를 기준 경로로 삼았어요.

---

## 6. 데이터

### 카드 데이터 (`src/aer-data/`)

카드, 마법사, 네메시스, 보물, 아군/적 정보가 **TypeScript 파일로 직접** 들어 있어요. 원래 별도 npm 패키지(`aer-data`)로도 배포하던 데이터예요.

```
src/aer-data/src/
├── ENG/          영어 (확장 33개)
│   ├── aeonsEnd/
│   │   ├── cards.ts              공급처 카드 (보석, 유물, 주문)
│   │   ├── mages.ts              마법사
│   │   ├── nemeses.ts            네메시스
│   │   └── basicNemesisCards.ts  기본 네메시스 카드
│   ├── warEternal/ ...
├── DE/           독일어 (14개)
├── FR/           프랑스어 (11개)
├── PL/           폴란드어 (17개)
├── index.ts               언어별 데이터를 모으는 곳
├── marketSetups.ts        미리 정의된 공급처 구성
└── turnOrderSetups.ts     턴 순서 카드 구성
```

- 각 카드의 `id`는 언어와 상관없이 같아요. 예를 들어 영어 "Diamond Cluster"와 독일어 "Rohdiamant"는 둘 다 `id: 'DiamondCluster'`예요.
- 효과 텍스트에는 `<b>Cast:</b>` 같은 HTML이 섞여 있어요.
- 확장마다 언어를 따로 고를 수 있어요(설정 → 확장 → 편집). 번역이 없는 내용은 영어로 표시돼요.
- `dataParser/` 폴더는 CSV 파일에서 이 데이터를 만들어내던 스크립트예요.

### 사용자 데이터: IndexedDB (idb-keyval)

**무엇인가:** IndexedDB는 브라우저에 내장된 저장소예요. idb-keyval은 이걸 "키 → 값" 형태로 쉽게 쓰게 해주는 작은 라이브러리예요.

**저장되는 것과 저장하는 코드 위치:**

- 확장 선택, 카드·마법사·네메시스 사용 여부, 카드 언어: `Redux/Store/Settings/Expansions/*/selected/`, `Languages/`, `GlobalLanguage/`
- 공급처 구성: `Redux/Store/Settings/SupplySetups/`
- 진행 중인 턴 순서 게임과 설정: `Redux/Store/TurnOrder/`
- 원정 기록: `Redux/Store/Expeditions/Expeditions/reducerHelpers/`

각 리듀서가 상태를 바꿀 때 redux-loop로 "IndexedDB에 저장" 명령을 함께 돌려주는 방식이에요. 앱이 시작할 때는 반대로 IndexedDB에서 읽어와 스토어를 채워요.

**알아둘 점:**

- 데이터는 **그 브라우저에만** 있어요. 다른 PC나 다른 브라우저에서는 보이지 않아요.
- 브라우저 사이트 데이터를 지우면 함께 사라져요.
- 원정은 공유 버튼으로 JSON을 내보내고, 다시 가져오기로 옮길 수 있어요.

**예외:** 화면 언어 설정(`ui-language`)만은 IndexedDB가 아니라 `localStorage`에 저장해요. 앱이 처음 뜰 때 바로 읽어야 해서예요.

---

## 7. 기타 라이브러리

| 라이브러리                       | 하는 일                                                                 | 쓰이는 곳                                              |
| -------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| **seedrandom**                   | 시드를 넣으면 매번 같은 무작위 결과를 냄. 원정 공유 시 결과 재현에 사용 | `Redux/helpers.ts`의 무작위 뽑기 함수                  |
| **shortid**                      | 짧은 고유 ID 생성 (원정, 전투, 사용자 공급처 구성)                      | `Redux/helpers.ts`, 원정 생성, 공급처 구성 편집        |
| **ajv**                          | JSON이 정해진 형식에 맞는지 검사. 원정 가져오기 검증에 사용             | `Expeditions/CreationDialog/ConfigImport/`             |
| **file-saver**                   | 브라우저에서 파일 다운로드 (원정 설정 저장)                             | `Expeditions/Expeditions/sideEffects/shareExpedition/` |
| **rpg-awesome**                  | 게임 느낌 아이콘 폰트 (해골, 지팡이 등)                                 | 하단 탭, 카드 타일 아이콘                              |
| **core-js, regenerator-runtime** | 오래된 브라우저에서도 최신 문법이 동작하게 보완                         | `src/index.tsx` 맨 위                                  |

---

## 8. 화면 문구 번역: i18next + react-i18next

> 원본 앱에는 화면 문구 번역 기능이 없었어요. 이 포크에서 새로 추가한 기능이에요.

**무엇인가:**

- **i18next:** 다국어 처리 엔진이에요. 사전에서 키로 문구를 찾고, `{{name}}` 같은 변수를 채우고, 번역이 없으면 영어로 대신 보여줘요.
- **react-i18next:** i18next를 React에 연결해요. 언어가 바뀌면 화면을 다시 그리게 해줘요.
- 둘 다 React 공식 기능이 아닌 외부 라이브러리예요. React 다국어 처리에서는 가장 널리 쓰여요.

**구조 (`src/i18n/`):**

| 파일            | 역할                                                |
| --------------- | --------------------------------------------------- |
| `index.ts`      | 초기화, 언어 감지·저장·전환, `t()` 함수             |
| `locales/en.ts` | 영어 사전 (기준)                                    |
| `locales/ko.ts` | 한국어 사전                                         |
| `types.ts`      | 한국어 사전이 영어와 같은 키를 갖도록 강제하는 타입 |

**동작 흐름:**

1. `src/index.tsx`가 `import './i18n'`으로 초기화해요.
2. 언어는 이렇게 정해요.
   - localStorage에 저장된 값(`ui-language`)이 있으면 그걸 써요.
   - 없으면 브라우저 언어가 한국어일 때 `ko`, 그 외에는 `en`이에요.
3. 컴포넌트는 문구를 `t('nav.settings')`처럼 키로 불러와요. 없는 키를 쓰면 타입 에러가 나요.
4. 설정 → 언어 선택 → 앱 언어에서 바꾸면 `changeUiLanguage()`가 저장하고 언어를 바꿔요.
5. `App/index.tsx`가 언어 변경을 감지해 앱 화면 전체를 다시 그려요.

**번역 수정:** `ko.ts`의 문자열만 고치면 돼요.

**새 문구 추가:**

1. `en.ts`에 키를 추가해요.
2. `ko.ts`에 같은 키를 추가해요. 빠뜨리면 빌드 에러가 나요.
3. 컴포넌트에서 `t('새.키')`로 써요.

**카드 언어와의 차이:** 카드 데이터 언어(6장)와 화면 언어는 서로 독립된 별개 시스템이에요.

---

## 9. 빌드와 개발 도구

### Node.js

JavaScript를 브라우저 밖(내 PC)에서 실행하는 프로그램이에요. 앱 자체가 아니라 **개발 도구**(개발 서버, 빌드, 테스트)를 돌리는 데 써요.

- 저장소가 기대하는 버전은 `.nvmrc`에 적힌 **16**이에요.
- 이 PC에는 22가 설치돼 있어서 아래 옵션이 필요해요.

### Yarn (classic 1.x)

라이브러리를 내려받고 관리하는 도구예요.

- `package.json`: 쓰는 라이브러리 목록과 실행 명령(scripts)
- `yarn.lock`: 실제로 설치된 정확한 버전. 팀원과 CI가 같은 버전을 쓰게 해줘요.
- `node_modules/`: 내려받은 라이브러리 파일. Git에는 올리지 않아요.
- 설치: `npm install -g yarn`. 설치하지 않았다면 Node에 내장된 `corepack yarn ...`으로도 실행할 수 있어요.

### Create React App (react-scripts 4)

React 앱용 개발 도구 모음이에요. 복잡한 설정 없이 아래 기능을 제공해요.

- **개발 서버:** 코드를 고치면 브라우저가 자동으로 새로고침돼요.
- **빌드:** 수백 개의 소스 파일을 브라우저용 파일 몇 개로 압축해 묶어요. 결과는 `build/` 폴더에 생겨요.
- **테스트 실행:** Jest를 돌려요.

내부에서는 이런 도구가 돌아가요.

- **webpack:** 파일들을 묶어요.
- **Babel:** TypeScript와 최신 문법을 브라우저용 JavaScript로 변환해요.
- **ESLint:** 코드 문제를 경고해요.

**이 PC에서 필요한 우회 옵션:**

| 옵션                                     | 이유                                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `NODE_OPTIONS=--openssl-legacy-provider` | react-scripts 4가 Node 17 이상의 새 암호화 모듈과 호환되지 않아요. Node 16을 쓰면 필요 없어요. |

> 프로젝트 폴더 경로에 작은따옴표(`'`)를 넣지 마세요. 개발 서버의 자동 새로고침과 커밋 훅이 깨져요. 예전 폴더 이름 `aeon's end`에서 실제로 겪은 문제예요.

### 주요 명령어 (`package.json`의 scripts)

| 명령                | 하는 일                                                      |
| ------------------- | ------------------------------------------------------------ |
| `yarn start`        | 개발 서버 실행 → http://localhost:3000/aeons-end-randomizer/ |
| `yarn build:base`   | 배포용 빌드 (`build/` 폴더 생성)                             |
| `yarn test:jest`    | 단위 테스트 (파일을 고칠 때마다 다시 실행되는 감시 모드)     |
| `yarn test:jest:ci` | 단위 테스트 한 번만 실행                                     |
| `yarn test:cy`      | Cypress 화면 테스트                                          |
| `yarn docs`         | `docs/` 폴더의 사용 설명서 사이트 미리보기 (docsify)         |

**이 PC에서 개발 서버 켜기 (PowerShell):**

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"; yarn start
```

### Prettier + husky

- **Prettier:** 들여쓰기, 따옴표, 줄바꿈 같은 코드 모양을 자동으로 통일해요. 규칙은 `.prettierrc.yaml`에 있어요.
- **husky:** Git 커밋 직전에 `pretty-quick`을 실행해서 바뀐 파일을 Prettier로 정리하게 해요.
- 커밋할 때 자동으로 돌아서 따로 할 일은 없어요. 커밋 없이 직접 정리하려면 이렇게 실행하세요.
  ```bash
  node node_modules/prettier/bin-prettier.js --write <파일들>
  ```

---

## 10. 테스트

### Jest (단위 테스트)

함수나 리듀서가 맞게 동작하는지 코드로 확인해요.

- 위치: 각 폴더의 `__test__/` 안에 있는 `*.test.ts` 파일
- 주로 Redux 리듀서와 헬퍼, 일부 컴포넌트를 테스트해요.
- 현재 86개 테스트 묶음, 360개 테스트가 통과해요.
- 실행:
  ```powershell
  $env:CI="true"; yarn test:jest -w 1
  ```

### Cypress (화면 테스트, E2E)

실제 브라우저를 띄워서 클릭하고 입력하며 화면 흐름을 검사해요.

- 위치: `cypress/e2e/`
- 설정: `cypress.config.ts`
- 화면 요소는 `data-test="..."` 속성으로 찾아요. 그래서 문구를 번역해도 테스트가 깨지지 않아요.

### CI (GitHub Actions)

`.github/workflows/`에 자동 실행 설정이 있어요.

| 파일                         | 하는 일                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `jest.yml`                   | 모든 브랜치 푸시, main·dev로의 PR 때 Jest 실행                                      |
| `cypress.yml`                | Cypress 실행                                                                        |
| `deploy-pages.yml`           | main 푸시 때 GitHub Pages에 배포 (이 포크에서 추가)                                 |
| `update-release-version.yml` | 원본 저장소의 릴리스 버전 갱신용. 이 포크에서는 비밀 토큰이 없어서 동작하지 않아요. |

---

## 11. 배포

### GitHub Pages (현재 방식)

`deploy-pages.yml`의 흐름이에요.

1. main 브랜치에 푸시해요.
2. GitHub 서버에서 Node 16으로 `yarn install`과 `yarn build:base`를 실행해요.
3. `build/index.html`을 `404.html`로 복사해요. 하위 주소에서 새로고침해도 앱이 뜨게 하기 위해서예요.
4. `build/` 폴더를 GitHub Pages에 올려요. 주소는 https://shawn-kim1302.github.io/aeons-end-randomizer/ 예요.

**필요한 설정:**

- 저장소 Settings → Pages → Source를 **GitHub Actions**로 해야 해요.
- `package.json`의 `homepage`가 이 주소와 일치해야 해요. 빌드 시 파일 경로의 기준이 돼요.

### Docker + nginx (대안, 현재 미사용)

`docker/` 폴더는 앱을 빌드해서 nginx 웹서버 컨테이너로 띄우는 설정이에요. 내 서버에서 직접 호스팅할 때 써요. 개발이나 GitHub Pages 배포에는 필요 없어요.

---

## 12. 전체 흐름 요약

```
[개발]
코드 수정 (TypeScript + React 컴포넌트, Redux 로직, 사전 파일)
  │
  ├─ yarn start           → 내 PC에서 미리보기 (localhost:3000)
  ├─ yarn test:jest       → 로직 검사
  └─ git commit           → (husky가 Prettier 정리)

[배포]
git push (main)
  → GitHub Actions: 설치 → 빌드 → 404.html 복사
  → GitHub Pages: 누구나 접속 가능한 사이트

[사용자 브라우저]
HTML/JS 다운로드 → React가 화면 그림
  → 카드 데이터: 코드에 포함
  → 설정·원정: IndexedDB에 저장
  → 화면 언어: localStorage에 저장
```

---

## 13. 작업 종류별로 봐야 할 곳

| 하고 싶은 일          | 볼 곳                                                              | 필요한 지식               |
| --------------------- | ------------------------------------------------------------------ | ------------------------- |
| 화면 문구 번역 수정   | `src/i18n/locales/ko.ts`                                           | 없음 (문자열만 수정)      |
| 카드 한국어 번역 추가 | `src/aer-data/src/`에 `KO/` 폴더 추가, `index.ts`에 등록           | TypeScript 객체 문법 기초 |
| 화면 모양 바꾸기      | `src/components/`의 해당 컴포넌트, styled-components               | React, CSS                |
| 뽑기 규칙 바꾸기      | `src/Redux/Store/Randomizer/`                                      | Redux, TypeScript         |
| 원정 규칙 바꾸기      | `src/Redux/Store/Expeditions/`                                     | Redux, redux-loop         |
| 새 화면 추가          | `pages/`에 컴포넌트, `Routing.tsx`에 경로, `Navigation.tsx`에 메뉴 | React, React Router       |

---

## 14. 공부 순서 추천

1. **React 기초:** 컴포넌트, props, JSX. 이것만 알아도 대부분의 화면 코드를 읽을 수 있어요. (https://react.dev/learn)
2. **TypeScript 기초:** 타입 표기 읽는 법. (https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
3. **React 훅:** `useState`, `useEffect`, `useCallback`.
4. **Redux 개념:** 액션, 리듀서, 스토어, 셀렉터. 뽑기나 원정 로직을 고칠 때 필요해요. (https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
5. 나머지(redux-loop, reselect, Material-UI 등)는 해당 부분을 고칠 때 필요한 만큼만 보면 돼요.
