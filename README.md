# Camping Planner Server Completed

이 프로젝트는 캠핑 플래너 화면이 호출하는 Express API를 JavaScript 시작 코드에서 TypeScript로 옮긴 완성 코드입니다. 한국관광공사 고캠핑 공공 API에서 받은 캠핑장 정보를 PostgreSQL에 저장하고, 캠핑장 목록·상세 조회와 캠핑 계획 조회·추가·수정 API를 제공합니다. 옮기기 전과 API의 동작은 같습니다.

요청 처리는 `src/controllers/`(Controller), `src/services/`(Service), `src/repositories/`(Repository), `src/providers/`(Provider)로 나눴고, 객체를 만들고 연결하는 일은 `src/common/di/container.ts`의 awilix 컨테이너가 맡습니다. Express 앱 구성은 `src/app.ts`의 `App` 클래스가, 서버 시작은 `src/main.ts`의 `bootstrap()`이 맡습니다.

## 제공하는 것

- 제공: 캠핑장 목록·상세 조회(`GET /api/campsites`, `GET /api/campsites/:id`, `?pet=true`로 반려동물 동반 가능 캠핑장만), 캠핑 계획 조회·추가·수정(`GET /api/trips`, `POST /api/trips`, `PATCH /api/trips/:id`), 고캠핑 API 동기화 스크립트, 입력 검증·에러 처리·CORS 미들웨어
- TypeScript 설정: `src/` 아래 JavaScript 파일을 모두 TypeScript로 옮겼습니다. 타입 검사는 `pnpm typecheck`(`tsc --noEmit`)가 `tsconfig.json`의 설정으로 하고, 빌드는 `pnpm build`(`tsdown`)가 `src/main.ts`와 그 파일이 가져오는 파일을 `dist/main.mjs` 한 파일로 묶습니다. `pnpm dev`와 `pnpm campsites:sync`는 tsx로 `src/`의 `.ts` 파일을 바로 실행하고, `pnpm start`는 빌드 결과인 `dist/main.mjs`를 실행합니다. tsx와 tsdown은 타입을 검사하지 않습니다. `package.json`의 `"imports"` 별칭(`#config` 등)은 `src/`를 가리키고, tsdown은 빌드할 때 별칭을 풀어 파일을 묶습니다.
- 손대지 않는 파일: `src/prisma/contract.json`·`src/prisma/contract.d.ts`와 `migrations/`는 Prisma가 만드는 파일입니다.

## 구조

- `src/controllers/`: `BaseController`를 상속한 `CampsiteController`·`TripController`, 두 Controller의 경로를 `/api` 아래에 모으는 최상위 `Controller`, 요청 검증 스키마와 응답 변환 함수(`dto/`)
- `src/services/`: 캠핑장 조회·동기화와 캠핑 계획의 상태 변경 규칙을 담당하는 `CampsiteService`·`TripService`
- `src/repositories/`: Prisma 쿼리를 감추는 `CampsiteRepository`·`TripRepository`
- `src/providers/`: 고캠핑 API 호출을 감싼 `GoCampingProvider`
- `src/middlewares/`: CORS·입력 검증·에러 처리 미들웨어
- `src/common/`: 상수·예외, 고캠핑 응답 스키마와 변환 함수, awilix 컨테이너(`di/container.ts`)와 컨테이너에 등록한 객체의 타입(`di/container.interface.ts`)
- `src/config/`, `src/prisma/`: 환경 변수 검증, Prisma 8 계약(`contract.prisma`)·emit 결과물·데이터베이스 연결 파일(`db.ts`)·행 타입과 `Db`(`db.interface.ts`)
- `src/interface/`: 캠핑 계획 상태 타입 `TripStatus`와 리포지토리·서비스가 함께 쓰는 캠핑 계획 입력 타입(`trip.interface.ts`)
- `src/scripts/sync-campsites.ts`: 고캠핑 API의 캠핑장을 데이터베이스에 저장하는 동기화 스크립트
- 타입만 담은 파일은 그 타입을 쓰거나 뽑아 온 파일 옆에 `<파일 이름>.interface.ts`로 둡니다(`schemas/*.schema.interface.ts`, `dto/*.dto.interface.ts`, `validation.middleware.interface.ts` 등). 상수 폴더 `common/constants`에는 값만 둡니다. 상수에서 뽑은 타입(`TripStatus`)과, 옆에 둘 파일 없이 여러 계층이 함께 쓰는 한 도메인의 타입은 `src/interface/<도메인>.interface.ts`에 둡니다.

## 시작하기

1. 의존성을 설치합니다.

```bash
pnpm install
```

2. 로컬 PostgreSQL에 비어 있는 `camping_planner` 데이터베이스를 만듭니다. `psql`로
   접속한 뒤 아래 SQL을 실행합니다.

```sql
CREATE DATABASE camping_planner;
```

3. `env/.env.example`을 `env/.env.development`로 복사하고 PostgreSQL 연결 정보와
   공공데이터포털에서 발급받은 고캠핑 API 일반 인증키를 입력합니다.

4. 비어 있는 데이터베이스에 계약의 테이블을 만듭니다. emit 결과물은 저장소에
   포함되어 있으므로 계약을 바꾸지 않았다면 emit을 다시 실행하지 않아도 됩니다.

```bash
pnpm prisma:init
```

계약(`src/prisma/contract.prisma`)을 바꿨다면 `pnpm prisma:emit`으로 결과물을
다시 만듭니다.

5. 고캠핑 API에서 캠핑장 정보를 받아 데이터베이스에 저장합니다. 이 명령은
   tsx로 `src/scripts/sync-campsites.ts`를 실행합니다. 이 단계를
   건너뛰면 캠핑장 테이블이 비어 있어 목록 API와 화면의 캠핑장 목록이 비어
   있습니다.

```bash
pnpm campsites:sync
```

터미널 마지막 줄에 `저장한 캠핑장 60개`가 보이면 저장이 끝난 것입니다.

6. 개발 서버를 실행합니다. `pnpm dev`는 tsx로 `src/main.ts`를 실행하고,
   이 파일이나 이 파일이 import하는 파일이 바뀌면 서버를 다시 시작합니다.

```bash
pnpm dev
```

터미널에 `서버가 4000번 포트에서 실행 중입니다.`가 보이면
`http://localhost:4000/api` 아래의 캠핑장·캠핑 계획 API를 호출할 수 있습니다.
개발 환경(`NODE_ENV=development`)에서는 모든 출처의 요청을 허용하므로
`http://localhost:3000`의 화면 프로젝트에서 바로 호출할 수 있습니다.

## 확인하기

서버를 실행해 둔 채 다른 터미널에서 아래 명령을 실행합니다.

```bash
curl http://localhost:4000/api/ping
curl http://localhost:4000/api/campsites
```

첫 명령은 `{"message":"ok"}`를 출력하고, 둘째 명령은 저장한 캠핑장을 JSON
배열로 출력합니다. 배열이 `[]`로 비어 있으면 5단계의 `pnpm campsites:sync`를
실행했는지 확인합니다.

코드 포맷은 Prettier로 합니다. `pnpm format:check`는 파일을 고치지 않고 검사만
하며, 문제가 없으면 `All matched files use Prettier code style!`를 출력하고,
포맷이 다른 파일이 있으면 그 파일을 `[warn]`으로 시작하는 줄에 보여 줍니다.
`pnpm format`은 그 파일들의 포맷을 고쳐 씁니다.

```bash
pnpm format:check
pnpm format
```
