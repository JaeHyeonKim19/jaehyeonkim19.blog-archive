---
title: '[자바]백준 14890 경사로'
date: 2020-07-19 09:00:00 +0900
path: 'codingtest/20200719boj_14890_slope_way'
---

| 시간 제한 | 메모리 제한 | 제출  | 정답 | 맞은 사람 | 정답 비율 |
| --------- | ----------- | ----- | ---- | --------- | --------- |
| 2초       | 512MB       | 12559 | 6552 | 4669      | 53.214%   |

### 문제

크기가 N×N인 지도가 있다. 지도의 각 칸에는 그 곳의 높이가 적혀져 있다.

오늘은 이 지도에서 지나갈 수 있는 길이 몇 개 있는지 알아보려고 한다. 길이란 한 행 또는 한 열 전부를 나타내며, 한쪽 끝에서 다른쪽 끝까지 지나가는 것이다.

다음과 같은 N=6인 경우 지도를 살펴보자.

![](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14890/1.png)

이때, 길은 총 2N개가 있으며, 아래와 같다.

![](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14890/2.png)

길을 지나갈 수 있으려면 길에 속한 모든 칸의 높이가 모두 같아야 한다. 또는, 경사로를 놓아서 지나갈 수 있는 길을 만들 수 있다. 경사로는 높이가 항상 1이며, 길이는 L이다. 또, 개수는 매우 많아 부족할 일이 없다. 경사로는 낮은 칸과 높은 칸을 연결하며, 아래와 같은 조건을 만족해야한다.

경사로는 낮은 칸에 놓으며, L개의 연속된 칸에 경사로의 바닥이 모두 접해야 한다.
낮은 칸과 높은 칸의 높이 차이는 1이어야 한다.
경사로를 놓을 낮은 칸의 높이는 모두 같아야 하고, L개의 칸이 연속되어 있어야 한다.
아래와 같은 경우에는 경사로를 놓을 수 없다.

경사로를 놓은 곳에 또 경사로를 놓는 경우
낮은 칸과 높은 칸의 높이 차이가 1이 아닌 경우
낮은 지점의 칸의 높이가 모두 같지 않거나, L개가 연속되지 않은 경우
경사로를 놓다가 범위를 벗어나는 경우
L = 2인 경우에 경사로를 놓을 수 있는 경우를 그림으로 나타내면 아래와 같다.

![](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14890/3.png)

경사로를 놓을 수 없는 경우는 아래와 같다.

![](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14890/4.png)

위의 그림의 가장 왼쪽부터 1번, 2번, 3번, 4번 예제라고 했을 때, 1번은 높이 차이가 1이 아니라서, 2번은 경사로를 바닥과 접하게 놓지 않아서, 3번은 겹쳐서 놓아서, 4번은 기울이게 놓아서 불가능한 경우이다.

가장 위에 주어진 그림 예의 경우에 지나갈 수 있는 길은 초록색으로, 지나갈 수 없는 길은 빨간색으로 표시되어 있으며, 아래와 같다. 경사로의 길이 L = 2이다.

![](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14890/5.png)

지도가 주어졌을 때, 지나갈 수 있는 길의 개수를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 N (2 ≤ N ≤ 100)과 L (1 ≤ L ≤ N)이 주어진다. 둘째 줄부터 N개의 줄에 지도가 주어진다. 각 칸의 높이는 10보다 작거나 같은 자연수이다.

### 출력

첫째 줄에 지나갈 수 있는 길의 개수를 출력한다.

### 예제 입력1

```
6 2
3 3 3 3 3 3
2 3 3 3 3 3
2 2 2 3 2 3
1 1 1 2 2 2
1 1 1 3 3 1
1 1 2 3 3 2
```

### 예제 출력1

```
3
```

### 예제 입력2

```
6 2
3 2 1 1 2 3
3 2 2 1 2 3
3 2 2 2 3 3
3 3 3 3 3 3
3 3 3 3 2 2
3 3 3 3 2 2
```

### 예제 출력2

```
7
```

### 예제 입력3

```
6 3
3 2 1 1 2 3
3 2 2 1 2 3
3 2 2 2 3 3
3 3 3 3 3 3
3 3 3 3 2 2
3 3 3 3 2 2
```

### 예제 출력3

```
3
```

### 예제 입력4

```
6 1
3 2 1 1 2 3
3 2 2 1 2 3
3 2 2 2 3 3
3 3 3 3 3 3
3 3 3 3 2 2
3 3 3 3 2 2
```

### 예제 출력4

```
11
```

### 풀이

높이 정보를 배열에 저장하고 행, 열별로 순회하면서 경사로를 사용하여 끝까지 도달할 수 있는지 확인한다. 높이 정보를 가지고 있는 배열과 같은 크기의 배열을 만들어 경사로가 놓여있는지를 기록한다. 이미 경사로가 놓인 위치에는 경사로를 놓을 수 없기 떄문이다. 끝까지 도달하려면 다음과 같은 조건을 충족해야한다.

1. 다음 블록과 높이가 2이상 차이나면 안된다.
2. 다음 블록과 높이가 같으면 경사로 없이 통과 할 수 있다.
3. 다음 블록이 1 낮으면 다음 블록(n + 1)부터 n + L 블록까지 (경사로 길이만큼) 같은 높이 블록이 있는지 검사한다. 당연히 배열 범위에 포함되는지 확인해야한다.
4. 다음 블록이 1 높으면 현재 위치(n)부터 n - L + 1 블록까지 (경사로 길이만큼) 같은 높이 블록이 있는지 검사한다. 당연히 배열 범위에 포함되는지 확인해야한다. 이 경우에는 이미 경사로가 놓아져 있을 수도 있으므로 경사로가 이미 놓였는지 아닌지 확인해줘야한다.

위 조건을 충족하면 정답 카운트를 1 증가시켜준다.

### 제출 코드

```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
    	// init
    	int answer = 0;
    	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    	StringTokenizer st = new StringTokenizer(br.readLine());
    	int n = Integer.parseInt(st.nextToken());
    	int l = Integer.parseInt(st.nextToken());
    	int [][] map = new int[n][n];
    	boolean [][] isSlope = new boolean[n][n];
    	for(int i = 0; i < n; i++) {
    		st = new StringTokenizer(br.readLine());
    		for(int j = 0; j < n; j++) {
    			map[i][j] = Integer.parseInt(st.nextToken());
    		}
    	}
    	// check
    	for(int i = 0; i < n; i++) {
    		int j;
    		for(j = 0; j < n - 1; j++) {
    			if(map[i][j] == map[i][j + 1]) {
    				continue;
    			}else if(Math.abs(map[i][j] - map[i][j + 1]) > 1) {
    				break;
      			}else if(map[i][j] - 1 == map[i][j + 1]) {
      				boolean flag = false;
      				for(int k = 1; k < l; k++) {
      					if(j + 1 + k >= n || map[i][j + 1] != map[i][j + 1 + k]) {
      						flag = true;
      						break;
      					}
      				}
      				if(flag) {
      					break;
      				}else {
      					for(int k = 0; k < l; k++) {
      						isSlope[i][j + 1 + k] = true;
      					}
      				}
    			}else if(map[i][j] + 1 == map[i][j + 1]) {
    				// 오르막
    				// 뒤로 같은 높이인지 확인하면서 이미 경사아닌지 확
    				boolean flag = false;
    				for(int k = 0; k < l; k++) {
    					if(j - k < 0 || isSlope[i][j - k] || map[i][j] != map[i][j - k]) {
    						flag = true;
    						break;
    					}
    				}
    				if(flag) {
      					break;
      				}else {
      					for(int k = 0; k < l; k++) {
      						isSlope[i][j - k] = true;
      					}
      				}
    			}
    		}
    		if(j == n - 1) answer++;
    	}

    	for(int i = 0; i < n; i++) {
    		Arrays.fill(isSlope[i], false);
    	}

    	for(int i = 0; i < n; i++) {
    		int j;
    		for(j = 0; j < n - 1; j++) {
    			if(map[j][i] == map[j + 1][i]) {
    				continue;
    			}else if(Math.abs(map[j][i] - map[j + 1][i]) > 1) {
    				break;
      			}else if(map[j][i] - 1 == map[j + 1][i]) {
      				boolean flag = false;
      				for(int k = 1; k < l; k++) {
      					if(j + 1 + k >= n || map[j + 1][i] != map[j + 1 + k][i]) {
      						flag = true;
      						break;
      					}
      				}
      				if(flag) {
      					break;
      				}else {
      					for(int k = 0; k < l; k++) {
      						isSlope[j + 1 + k][i] = true;
      					}
      				}
    			}else if(map[j][i] + 1 == map[j + 1][i]) {
    				// 오르막
    				// 뒤로 같은 높이인지 확인하면서 이미 경사아닌지 확
    				boolean flag = false;
    				for(int k = 0; k < l; k++) {
    					if(j - k < 0 || isSlope[j - k][i] || map[j][i] != map[j- k][i]) {
    						flag = true;
    						break;
    					}
    				}
    				if(flag) {
      					break;
      				}else {
      					for(int k = 0; k < l; k++) {
      						isSlope[j - k][i] = true;
      					}
      				}
    			}
    		}
    		if(j == n - 1) answer++;
    	}
    	// print
    	System.out.print(answer);
    }
}
```
