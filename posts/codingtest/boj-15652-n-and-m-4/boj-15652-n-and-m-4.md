---
title: '[자바]백준 15652 N과 M(4)'
date: 2020-07-19 09:00:00 +0900
path: 'codingtest/20200719boj_15652_n_and_m_4'
---

| 시간 제한 | 메모리 제한 | 제출 | 정답 | 맞은 사람 | 정답 비율 |
| --------- | ----------- | ---- | ---- | --------- | --------- |
| 1초       | 512MB       | 8592 | 7055 | 5816      | 82.614%   |

### 문제

자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

- 1부터 N까지 자연수 중에서 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.
- 고른 수열은 비내림차순이어야 한다. - 길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.

### 입력

첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)

### 출력

한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.

수열은 사전 순으로 증가하는 순서로 출력해야 한다.

### 예제 입력1

```
3 1
```

### 예제 출력1

```
1
2
3
```

### 예제 입력2

```
4 2
```

### 예제 출력2

```
1 1
1 2
1 3
1 4
2 2
2 3
2 4
3 3
3 4
4 4
```

### 예제 입력3

```
3 3
```

### 예제 출력3

```
1 1 1
1 1 2
1 1 3
1 2 2
1 2 3
1 3 3
2 2 2
2 2 3
2 3 3
3 3 3
```

### 풀이

재귀함수를 이용한다. 1부터 n까지 함수를 한 번 호출한다. 함수 내부에서는 입력된 숫자를 배열의 알맞은 위치에 저장하고 본인숫자부터 n까지 다시 호출한다. 배열을 사용하는 이유는 m번 만큼 호출 되었을때 그 이전 값들을 함께 출력해주기 위해서이다.

### 제출 코드

```java
import java.io.*;
import java.util.*;

public class Main {
	static int n;
	static int m;
	static int[] currentProgression;

	static void makeProgression (int currentNumber, int depth, BufferedWriter bw) throws IOException {
		currentProgression[depth] = currentNumber;

		if(depth + 1 == m) {
			for(int i = 0; i < currentProgression.length; i++) {
				bw.append(currentProgression[i] + " ");
			}
			bw.append("\n");
			return;
		}else {
			for(int i = currentNumber; i <= n; i++) {
				makeProgression(i, depth + 1, bw);
			}
		}
	}

    public static void main(String[] args) throws IOException{
    	// init
    	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    	BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    	StringTokenizer st = new StringTokenizer(br.readLine());
    	n = Integer.parseInt(st.nextToken());
    	m = Integer.parseInt(st.nextToken());
    	currentProgression = new int [m];

    	// solve
    	for(int i = 1; i <= n; i++) {
    		makeProgression(i, 0, bw);
    	}

    	// print
    	bw.flush();
    }
}
```
