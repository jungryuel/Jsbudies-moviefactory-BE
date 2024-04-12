
# 영화

## 기능명세서

| 유저 | 계좌 | 은행 |
| --- | --- | --- |
| 유저생성 | 계좌조회 | 지점조회 |
| 유저조회 | 계좌개설 | 직원조회 |
| 비밀번호변경 | 계좌해지 | 방문예약 |
| 로그아웃 | 입금 |  |
| 회원탈퇴 | 출금 |  |
| 신용정보조회 | 입츌금내역 조회 |  |

## 데이터 모델링

![image (2)](https://github.com/encore-full-stack-5/Bank/assets/74495717/a0bb4521-5d12-493d-ab3c-28650b243420)

## 도메인 추출

![image (3)](https://github.com/encore-full-stack-5/Bank/assets/74495717/bf2c87f1-6d35-4f7c-8010-6a7d43e16964)

## 역할 배분

**유저 : 이승규**

**계좌 : 김세현, 조진호**

**지점 : 박현서**

**직원 : 김부자**

## 패키지구조 결정 DDD

![스크린샷 2024-03-18 오후 11 24 44](https://github.com/encore-full-stack-5/Bank/assets/74495717/cef90a66-2c2f-42e9-a811-c188ac814f7a)

![스크린샷 2024-03-18 오후 11 24 35](https://github.com/encore-full-stack-5/Bank/assets/74495717/5dacd1e4-2934-4b8f-9607-0e73fa0c5e22)


## 메인인덱스 Application이 유저의 UI라고 생각하고 코드를 작성

![스크린샷 2024-03-19 오전 12 01 16](https://github.com/encore-full-stack-5/Bank/assets/74495717/15fdfbda-84cf-4807-8fab-d004bcca4aae)

```java
public static void main(String[] args) {
    DB.getInstance();
    while (true) {
        try {
            if(userState == null) start();
            else mainMenu();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

```java
public static void createAccount() throws Exception {
    // 은행을 선택화면 제공
    List<Bank> banks = bankController.findAllBanks();
    Bank bank = banks.get(ConsoleUtility.promptForChoice("위의 은행중 하나를 선택해주세요", 1, banks.size()) -1);

    // 직원 선택화면 제공
    List<Employee> employees = bankController.findEmployeeByBankId(bank.getId());
    Employee employee = employees.get(ConsoleUtility.promptForChoice("위의 직원중 하나를 선택해주세요", 1, employees.size()) -1);

    //선택된 정보를 바탕으로 계좌개설 로직 실행
    Account account = accountController.createAccount(userState.getUid(), bank.getId(), employee.getId());
    ConsoleUtility.systemMessage(account.toString());
}
```

## 인터페이스를 이용한 DB 교체작업

```java
public interface BankRepositoryDB {
    Employee findEmployeeById(int employeeId) throws Exception;
    List<Bank> findAllBanks() throws Exception;
    List<Account> findAccountsByEmployeeId(int employeeId) throws Exception;
    List<Employee> findEmployeesByBankId(int bankId) throws Exception;
}
```

```java
@Override
public Employee findEmployeeById(int employeeId) throws Exception {
    Employee employee = employeeTable.get(employeeId);
    if(employee == null) {
        throw new Exception("해당하는 직원이 존재하지 않습니다.");
    }
    return employee;
}
```

```java
@Override
public Employee findEmployeeById(int employeeId) throws Exception {
    String sql = "SELECT * FROM Employee WHERE id = ?";
    try (Connection conn = DB.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, employeeId);
        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                return extractEmployee(rs);
            }
        }
    }
    throw new Exception("해당 직원 정보를 찾을 수 없습니다.");
}
```

## 서버없이 공통의 DB환경을 구축

```java
public class DB {

    private static final String USERNAME = "root";
    private static final String PASSWORD = "1234";

    private static class DatabaseHolder {
        static final DB INSTANCE = new DB();
    }

    public static DB getInstance() {
        return DatabaseHolder.INSTANCE;
    }
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
                DBInitializer.DATABASE_URL,
                USERNAME,
                PASSWORD
        );
    }

    private DB() {
        initDataBase();
    }

    private void initDataBase() {
        DBInitializer.init();
        DBInitializer.initDummy();
    }
}
```

```java
public class DBInitializer {
    public static String DATABASE_URL = "jdbc:mysql://localhost:3306/";

    public static void init() {
        try (Connection conn = DriverManager.getConnection(DATABASE_URL, Constants.USERNAME, Constants.PASSWORD);
             Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE DATABASE IF NOT EXISTS bank");
            stmt.execute("use bank");
            DATABASE_URL = "jdbc:mysql://localhost:3306/bank";
            stmt.executeUpdate(QueryText.CREATE_USER_QUERY);
            stmt.executeUpdate(QueryText.CREATE_BANK_QUERY);
            stmt.executeUpdate(QueryText.CREATE_EMPLOYEE_QUERY);
            stmt.executeUpdate(QueryText.CREATE_ACCOUNT_QUERY);
            stmt.executeUpdate(QueryText.CRATE_TRANSACTION_HISTORY_QUERY);
            stmt.executeUpdate(QueryText.CRATE_RESERVATION_QUERY);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void initDummy() {
        try (Connection conn = DriverManager.getConnection(DATABASE_URL, Constants.USERNAME, Constants.PASSWORD);
             Statement stmt = conn.createStatement()) {
            stmt.execute("use bank");
            stmt.executeUpdate(QueryText.INSERT_USER_DUMMY);
            stmt.executeUpdate(QueryText.INSERT_BANK_DUMMY);
            stmt.executeUpdate(QueryText.INSERT_EMPLOYEE_DUMMY);
            stmt.executeUpdate(QueryText.INSERT_ACCOUNT_DUMMY);
            stmt.executeUpdate(QueryText.INSERT_RESERVATION_DUMMY);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

```java
public static final String CREATE_USER_QUERY = """
        CREATE TABLE IF NOT EXISTS Account (
            id INT AUTO_INCREMENT,
            accountNumber VARCHAR(255) NOT NULL UNIQUE,
            balance INT,
            type ENUM('DEPOSIT', 'SAVING'),
            bankId INT,
            userId INT,
            employeeId INT,
            password VARCHAR(255),
            interestRate FLOAT,
            createdTime DATETIME,
            PRIMARY KEY (id),
            FOREIGN KEY (bankId) REFERENCES Bank(id),
            FOREIGN KEY (userId) REFERENCES User(uid),
            FOREIGN KEY (employeeId) REFERENCES Employee(id)
        )
        """;
```

```java
public static final String INSERT_USER_DUMMY = "INSERT IGNORE INTO User\n" +
    "  (uid, loginId, password, name, address, phoneNumber, email, job, income, asset, birth, createdTime )\n" +
    "VALUES \n" +
    "   (1, 'test', '12345a', '테스트', '성남', '01012345678', 'test@gmail.com', 'FULL_TIME', 'OVER_400', 1000, '1996-01-01', '2024-03-14 00:00:00'),\n" +
    "   (2, 'user2', 'pass2', '김사랑', '서울', '01023456789', 'user2@example.com', 'FULL_TIME', 'OVER_400', 500, '1985-05-05', '2024-03-14 00:00:00'),\n" +
    "   (3, 'user3', 'pass3', '이몽룡', '부산', '01034567890', 'user3@example.com', 'STUDENT', 'OVER_400', 300, '1993-09-19', '2024-03-14 00:00:00'),\n" +
    "   (4, 'user4', 'pass4', '성춘향', '대구', '01045678901', 'user4@example.com', 'STUDENT', 'OVER_400', 800, '1990-12-12', '2024-03-14 00:00:00'),\n" +
    "   (5, 'user5', 'pass5', '홍길동', '인천', '01056789012', 'user5@example.com', 'FULL_TIME', 'OVER_400', 1200, '1982-02-22', '2024-03-14 00:00:00'),\n" +
    "   (6, 'user6', 'pass6', '장보고', '광주', '01067890123', 'user6@example.com', 'PART_TIME', 'OVER_400', 700, '1975-07-07', '2024-03-14 00:00:00'),\n" +
    "   (7, 'user7', 'pass7', '이순신', '울산', '01078901234', 'user7@example.com', 'STUDENT', 'OVER_400', 950, '1964-04-28', '2024-03-14 00:00:00'),\n" +
    "   (8, 'user8', 'pass8', '강감찬', '대전', '01089012345', 'user8@example.com', 'STUDENT', 'OVER_400', 200, '2000-08-15', '2024-03-14 00:00:00'),\n" +
    "   (9, 'user9', 'pass9', '을지문덕', '제주', '01090123456', 'user9@example.com', 'FULL_TIME', 'OVER_400', 1100, '1978-11-11', '2024-03-14 00:00:00')";
```

## 컨트롤러는 인풋 서비스는 검증 및 비즈니스

```java
@Override
public User signUp() throws Exception {

    String id = ConsoleUtility.promptForInput("아이디를 입력해주세요");
    String passwd = ConsoleUtility.promptForInput("비밀번호를 입력해주세요 문자하나포함 6자리이상");
    String name = ConsoleUtility.promptForInput("이름을 입력해주세요");
    String address = ConsoleUtility.promptForInput("주소를 입력해주세요");
    String phone = ConsoleUtility.promptForInput("핸드폰번호를 입력해주세요 - 없이작성");
    String email = ConsoleUtility.promptForInput("이메일을 입력해주세요 @들어가야함");
    int asset = ConsoleUtility.promptForInt("자산을 입력해주세요 단위:만원");
    String birth = ConsoleUtility.promptForInput("생년월일을 입력해주세요 -> xxxx-xx-xx");

    int jobChoice = ConsoleUtility.promptForChoice("직업을 선택해주세요 : 1.무직 2.학생 3.아르바이트 4.직장인", 1,4);
    Jobs jobs = Jobs.fromCommand(jobChoice);
    int incomeChoice = ConsoleUtility.promptForChoice("급여를 선택해주세요 : 1.없음 2.200만원 이상 3.400만원 이상 4.600만원 이상", 1,4);
    Income income = Income.fromCommand(incomeChoice);

    SignUpRequestDto signUpRequestDto = new SignUpRequestDto(
            id,
            passwd,
            name,
            address,
            phone,
            email,
            jobs,
            income,
            asset,
            birth
    );
    return userService.signUp(signUpRequestDto);
}
```

```java
@Override
public User signUp(SignUpRequestDto requestDto) throws Exception {
    // ID는 영숫자이고 밑줄을 포함할 수 있지만 문자로 시작하고 길이가 5~20자 사이여야 합니다.
    if (!requestDto.id().matches("^[A-Za-z][A-Za-z0-9_]{4,19}$")) {
        throw new Exception("아이디 양식이 유효하지 않습니다.");
    }
    // 비밀번호는 하나이상의 문자 + 6자리이상
    if (!requestDto.passwd().matches("^(?=.*[A-Za-z])[A-Za-z\\d]{6,}$")) {
        throw new Exception("비밀번호 양식이 유효하지 않습니다.");
    }
    if (!requestDto.email().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
        throw new Exception("이메일 양식이 유효하지 않습니다.");
    }
    if (!requestDto.phoneNumber().matches("^010\\d{8}$")) {
        throw new Exception("휴대폰 양식이 유효하지 않습니다.");
    }

    User validateUser = new User(
            requestDto.id(),
            requestDto.passwd(),
            requestDto.name(),
            requestDto.address(),
            requestDto.phoneNumber(),
            requestDto.email(),
            requestDto.job(),
            requestDto.income(),
            requestDto.asset(),
            requestDto.birth());
    validateUser.setCreatedTime(LocalDateTime.now());
    return repository.createUser(validateUser);
}
```

```java
@Override
public int measureCreditScore(User user) throws Exception {
    int totalScore = 0;
    int asset = user.getAsset(); // 예를 들어, 자산 단위를 만 단위로 가정
    Income income = user.getIncome(); // 월 수입을 가정

    if (asset >= 5000) {
        totalScore += 400;
    } else if (asset >= 1000) {
        totalScore += 250;
    } else {
        totalScore += 150;
    }

    switch (income) {
        case ZERO -> totalScore += 100;
        case OVER_200 -> totalScore += 200;
        case OVER_400 -> totalScore += 300;
        case OVER_600 -> totalScore += 400;
    }

    int loading = 0;
    while (loading < 100) {
        loading += 1 + (int)(Math.random() * 13);
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        if(loading > 100) loading = 100;
        System.out.println("신용점수를 측정 중입니다 "+loading+"%");
    }

    return totalScore;
}ò
```

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
