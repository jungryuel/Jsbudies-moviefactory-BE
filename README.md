
# 영화 리뷰 프로젝트

## 기능명세서

| 유저 | 영화 | 리뷰 | 댓글 |
| --- | --- | --- |  --- |
| 유저생성 | 영화 리스트 조회 | 리뷰 생성 | 댓글 생성 |
| 로그인 | 영화 상세 조회| 리뷰 삭제 | 댓글 수정 |
|  | | 리뷰 수정 | 댓글 삭제 |
|  | | 리뷰 리스트 조회 | 댓글 리스트 조회 |
|  |  | 리뷰 상세조회 |  |

## 데이터 모델링

![image (2)](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F4b7e0894-1b5c-4ece-b84c-1f981d8b0958%2F98ad00a9-8e31-467c-ba35-e833b6104007%2FUntitled.png?table=block&id=5e370aaa-dd1d-4456-8d65-b2bfe31de80f&spaceId=4b7e0894-1b5c-4ece-b84c-1f981d8b0958&width=2000&userId=1dc58707-8709-4f53-965d-d14b21fe27e4&cache=v2)

## 사용자 흐름도

![image (3)](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F4b7e0894-1b5c-4ece-b84c-1f981d8b0958%2F282ff7b0-d546-484a-8299-d6a7a43b5a14%2FUntitled.png?table=block&id=66e240dc-579e-47b2-b706-cc68ecd8a7cb&spaceId=4b7e0894-1b5c-4ece-b84c-1f981d8b0958&width=2000&userId=1dc58707-8709-4f53-965d-d14b21fe27e4&cache=v2)

## 역할 배분

**유저 : 김정렬**

**영화 : 정희석**

**리뷰 : 임서연**

**댓글 : 조진호**


## 트러블 슈팅

### 1.eager와 lazy(eager = 즉시로딩/lazy = 지연로딩)

![image (3)](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F4b7e0894-1b5c-4ece-b84c-1f981d8b0958%2Ff624f18c-8726-414f-ae8b-95884a868dbc%2FUntitled.png?table=block&id=9eb40613-e5f3-42b9-8516-7efa445b10b9&spaceId=4b7e0894-1b5c-4ece-b84c-1f981d8b0958&width=2000&userId=1dc58707-8709-4f53-965d-d14b21fe27e4&cache=v2)

데이터 요청을 보냈을 때 분명 맞는 코드인데 Response가 제대로 되지 않는 상황이 생겼는데 이때 엔티티의 컬럼에 eager를 사용해 제대로 데이터를 가져오게 되었다 조인때문에 그런 것 같다..

그렇기 떄문에 eager를 사용해 JOIN관계에 있는 모든 데이터를 한번에 가져와 response를 성공시켰다


### 2.오라클 데이터 삽입 문제

![image (3)](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F4b7e0894-1b5c-4ece-b84c-1f981d8b0958%2Fc7d5a5ee-9ffe-457e-a6fd-6b4bdd64735d%2FUntitled.png?table=block&id=ff6d9791-5cc1-4b7a-93da-00e6fe362949&spaceId=4b7e0894-1b5c-4ece-b84c-1f981d8b0958&width=2000&userId=1dc58707-8709-4f53-965d-d14b21fe27e4&cache=v2)

위 사진과 같이 pk가 뒤죽 박죽인 문제가 있었다 이번 프로젝트에서는 typeORM을 이용해서 테이블 생성 및 데이터 관리를 했는데 아마도 테이블 별로 시퀀스를 만들어주지 않고 하나의 시퀀스를 이용해 모든 테이블이 공유하기 때문에 pk가 뒤죽 박죽이 되었고 삭제한 자리에 데이터를 넣는 경우도 있어 많은 문제를 마주쳤다


## 어려웠던 점

1. 시작부터 DB까지의 데이터 흐름에 대한 이해가 필요했다.
2. 순수 자바 저장소에서 Mysql DB로의 변환
3. 예약 기능에 대한 데이터 모델링 설계 (중간 테이블)

## 느낀 점

1. 인터페이스 중요성을 느꼈다.
2. 유저 입력부터 DB까지의 데이터 흐름을 이해했다.
3. 자바 코드 기반에서 DB로 변환을 하면서 SQL 문법의 편리함을 느꼈다.
4. 데이터 모델링을 진행하고 그걸 기반으로 프로젝트를 진행함으로써 방향성, 효율성이 향상되는 걸 느꼈다.

## 아쉬운 점

1. 복잡한 기능이 없어 join, union, 서브 쿼리같은 복잡한 SQL 문법을 활용할 기회가 없어서 아쉬웠다.
2. 방향성을 정하는데 시간이 지체되어 기능을 더 고도화하거나 에러를 확실히 점검하는 시간이 부족했다.
3. 각각에 상황에 맞는 예외 처리가 아닌 모든 예외를 메인까지 throw에 일괄적으로 예외 처리를 하게 되어 아쉬웠다.
4. GIt을 처음 접해서 프로젝트에 대한 협업이 약간 불편했다.
5. 출력에 대한 결과가 그래픽이나 프론트엔드가 아닌 콘솔로만 출력을 해야해서 아쉬웠다.
