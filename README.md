# 출발시간 알림이

## PROJECT DESCRIPTION
![KakaoTalk_20230625_231659828_20](https://github.com/hacs2772/Screen/assets/107793142/610f3d14-b104-49c0-8157-9bcf584f2b9b)
  - 로고 이미지 입니다
  - 밝고 친근한 느낌으로 출발시간을 실시간으로 알려주는 어플리케이션 입니다.

<br>

## 전체적인 UI
![KakaoTalk_20230625_231659828_08](https://github.com/hacs2772/Screen/assets/107793142/3a4803e9-56ed-41e2-94cd-fa57f67b8a4d)
![KakaoTalk_20230625_231659828_05](https://github.com/hacs2772/Screen/assets/107793142/7998e80b-f33b-46ca-a4a2-461bb1f0e32f)

## 메인화면
![KakaoTalk_20230625_231659828_14](https://github.com/hacs2772/Screen/assets/107793142/1620c054-9235-44c1-b796-8b9847d6a3fe)
 - 메인 화면으로 출발시간 알림이를 클릭시 메인 으로 뜨는 화면입니다.

<br>



## 데이터 베이스(ROOM) 입력과정
![KakaoTalk_20230625_231659828_02](https://github.com/hacs2772/Screen/assets/107793142/10fb0c05-f6e7-4e3f-8f5a-da4e78bbcd9f)
![KakaoTalk_20230625_231659828_01](https://github.com/hacs2772/Screen/assets/107793142/7f5dc521-6496-45f2-affd-197c0b829f9f)
![KakaoTalk_20230625_231659828](https://github.com/hacs2772/Screen/assets/107793142/9944721f-abaa-4ec8-a86d-a5c6c99009d4)
 - 안드로이드 스튜디오 내부 데이터베이스에 사용자 출발시간 값을 전하는 과정</br>


<br>


## 경로 목록 및 최적화 루트 화면
![KakaoTalk_20230625_231659828_09](https://github.com/hacs2772/Screen/assets/107793142/c80d897d-72c7-4c82-af73-1d84ddf25b01)
![KakaoTalk_20230625_231659828_10](https://github.com/hacs2772/Screen/assets/107793142/4048a508-9c18-4eed-88b8-ba7ff5de87f9)

 - Odsay에서 받아온 대중교통 open API를 이용하여 최적화된 루트를 제공해주고
 - 최적화된 루트를 최상단으로 보여주고 있는 화면이다.


<br>


## 데이터베이스에 사용자 출발시간을 입력하는 화면
![KakaoTalk_20230625_231659828_07](https://github.com/hacs2772/Screen/assets/107793142/f221ebc8-fa45-4dc8-8018-dab2d3e776f9)
![KakaoTalk_20230625_231659828_04](https://github.com/hacs2772/Screen/assets/107793142/e78ce2a2-31ee-4610-a2ee-4b952dc94511)

 - 사용자가 원하는 시간과 요일에 맞는 시간 값을 데이터 베이스에 저장하는 화면이다.


<br>


## 최적화된 루트
![KakaoTalk_20230625_231659828_13](https://github.com/hacs2772/Screen/assets/107793142/86d1cbd4-1df5-4b06-971d-1b64d04383e7)

 - 사용자가 저장한 시간 값과 현재 위치를 이용하여 최적화된 루트를 보여주고 있다.
 - 디폴트 값은 최단시간이다.
 - 최저금액, 최저환승, 최저시간(디폴트 값), 원하는 교통수단 등등 사용자 입맛에 맞게 선택할 수 있다.


<br>


## 실시간 알림
![KakaoTalk_20230625_231659828_12](https://github.com/hacs2772/Screen/assets/107793142/9f1cee43-d460-4832-8e71-fcf518bdcc3c)

 - 백그라운드 상태에서도 실시간으로 사용자 위치에 따른 위치를 파악하여 최적 루트를 알려줌!!






<br>


## extra.... 첫시작 부터 끝까지 느낀점
![KakaoTalk_20230625_231659828_06](https://github.com/hacs2772/Screen/assets/107793142/4d0ad5e0-e008-41ba-a687-90bba98ac3da)
![KakaoTalk_20230625_231659828_18](https://github.com/hacs2772/Screen/assets/107793142/b46fc625-3962-4e28-ab50-f7e991150aee)
![KakaoTalk_20230625_231659828_17](https://github.com/hacs2772/Screen/assets/107793142/bca254b5-a078-498b-8a0f-686493e98886)
![KakaoTalk_20230625_231659828_19](https://github.com/hacs2772/Screen/assets/107793142/502b1ff4-07b9-446f-8644-dde99f5db3f2)
![KakaoTalk_20230625_231659828_15](https://github.com/hacs2772/Screen/assets/107793142/dcc342b4-c62d-49a8-b91e-9233d4633cf8)
<br>

간단하게 openAPI를 받아와서 쉽게 조금만 고치면 될 것만 같았던 프로젝트가 내맛대로 커스터마이징을 하다보니 생각보다 오래걸렸던 프로젝트였다. 
<br>

호출횟수 초과로 테스트가 정지가 됐던 적도 있었고 백그라운드 서비스를 하지 못하여 새로운 프래임워크를 써야하는 이슈도 있었던 우여곡절을 끝으로 
<br>

비록 처음에 계획했던 reactNative로 만든 웹과 앱 둘다 가능한 길찾기 서비스는 아니지만
<br>

안드로이드 서비스를 이용하여 개발하여 더 다양한 기능을 구사할 수 있었고
<br>

만족적인 성과를 낼 수 있어서 많은 배운점과 느낀점이 있는 잊을 수 없는 프로젝트라고 생각이 든다.
<br>

하지만 그러한 실패와 역경은 좀더 개발자로써 성장하는 계기가 될 수 있다는 생각에 뿌듯함과 시원함이 공존하고 있는 기분이 든다.
<br>

안드로이드를 다루는 첫 시작이였어서 시작부터 끝까지 어려웠지만 java능력도 안드로이드 어플리케이션이 어떻게 동작하는지 알 수 있던 계기가 될 수 있었다.
