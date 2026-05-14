# 구글 시트 예약 연동 세팅 가이드

현재 AI Studio의 앱에서 예약완료 시 구글시트로 데이터를 넘기기 위해선, 구글 시트 측에서 데이터를 받을 수 있도록 "웹 앱(Web App)"으로 배포하는 과정이 필요합니다.

아래 가이드를 순서대로 천천히 따라해보세요!

## 1. 구글 시트 준비하기
1. 구글 시트를 하나 새로 만듭니다. (또는 기존 시트를 엽니다)
2. 첫 번째 줄(A1~G1)에 각 열의 이름(헤더)을 아래와 같이 적어주세요. (글자는 다르게 써도 상관없지만 순서가 중요합니다)
   - A1: 타임스탬프 (신청시간)
   - B1: 담당자
   - C1: 이름
   - D1: 전화번호
   - E1: 지역
   - F1: 예약날짜
   - G1: 예약시간

## 2. Apps Script(앱스 스크립트) 열기
1. 시트 상단 메뉴에서 **[확장 프로그램] -> [Apps Script]** 를 클릭합니다.
2. 새 탭이 열리면서 코드 편집기가 나옵니다.
3. 원래 있던 `function myFunction() { ... }` 코드를 전부 삭제하세요.
4. 아래의 코드를 복사해서 붙여넣습니다.

```javascript
// --------- 여기부터 복사 ---------
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents); // 앱에서 전송한 데이터
    
    // 시트에 추가될 한 줄(Row) 구성 (위에서 적은 헤더 순서와 동일하게)
    sheet.appendRow([
      data.timestamp,   // A: 신청시간
      data.manager,     // B: 담당자
      data.name,        // C: 이름
      data.phone,       // D: 전화번호
      data.location,    // E: 지역
      data.date,        // F: 예약날짜
      data.time         // G: 예약시간
    ]);
    
    // 성공 시 앱 쪽에 응답 보내기
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 시 응답 보내기
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
// --------- 여기까지 복사 ---------
```

## 3. 웹 앱으로 배포하기 (핵심)
1. 코드 위쪽의 💾 버튼을 눌러 프로젝트를 저장합니다.
2. 우측 상단 파란색 버튼인 **[배포(Deploy)] -> [새 배포(New deployment)]** 를 클릭합니다.
3. `유형 선택` 옆의 톱니바퀴(⚙️) 아이콘을 누르고 **'웹 앱(Web app)'** 을 선택합니다.
4. 아래와 같이 설정하세요:
   - **설명:** 예약 접수 (아무렇게나 적어도 됩니다)
   - **실행 주체(Execute as):** `나(me)` (꼭 나로 선택해야 내 시트가 수정됨)
   - **액세스 권한(Who has access):** `모든 사용자(Anyone)` (로그인 없이 외부에서 데이터가 들어와야 하므로 필수)
5. **[배포(Deploy)]** 버튼을 클릭합니다.
6. (최초 실행 시) "액세스 승인(Authorize access)" 창이 뜹니다. 내 이메일 계정을 선택하고, '고급 -> ~로 이동(안전하지 않음)'을 클릭한 후, 허용(Allow)을 눌러주세요.
7. 배포가 완료되면 엄청 긴 **웹 앱 URL**이 하나 생성됩니다. 해당 URL을 "복사"하세요.

## 4. 앱에 URL 붙여넣기
1. AI Studio 좌측 파일 탐색기에서 `.env.example` (혹은 `.env`) 파일을 엽니다.
2. `VITE_GOOGLE_SHEETS_WEBHOOK_URL="여기안에"` 복사한 구글 웹 앱 URL을 붙여넣으세요.
3. 이제 상담 예약을 테스트해보시면 Гугл 시트에 실시간으로 데이터 행(Row)이 추가되는 것을 보실 수 있습니다!
