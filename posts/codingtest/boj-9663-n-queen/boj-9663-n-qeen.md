---
title: '[자바]백준 9663 N-Queen'
date: 2020-08-23 09:00:00 +0900
path: 'codingtest/20200823boj_9663_n_queen'
---

### 문제

[백준 9663번 N-Queen](https://www.acmicpc.net/problem/9663)

### 풀이

N x N 크기의 체스판에 N개의 퀸을 서로 공격할 수 없게 놓는 문제이다.

퀸은 기본적으로 상, 하, 좌, 우, 4개의 대각선 방향으로 거리에 관계없이 공격할 수 있다.

따라서 한 개의 행 또는 열에는 한 개의 퀸만 존재하게 된다.

행 또는 열 중 본인이 편한걸 기준으로 1차원 배열을 생성한다. 여기서는 행(row)을 기준으로 하겠다. 생성한 1차원 배열(아래 코드의 `int[] queenColumnLocations`)에는 각 행에 위치한 퀸이 몇 번째 열에 위치해있는지를 입력한다.

이제 앞서 말한바와같이 퀸의 위치한 열을 입력하면서 모든 경우의 수를 순회하면 되는데 다음 두 경우 퀸을 놓을 수 없다.

1. 이미 같은 열에 퀸이 놓여 있는 경우
2. 대각선 위치에 퀸이 존재하는 경우
	- (퀸1의 행 - 퀸2의 행)의 절댓값과 (퀸1의 열 - 퀸2의 열)의 절댓값이 같으면 대각선에 위치한 것이다.

우리는 1행 부터 차례대로 퀸을 놓을 것이기 때문에 n 행이면 1행부터 n-1행까지만 확인을 하면된다. 위에 조건을 충족하지 못하면 리턴을 하여 재귀함수를 즉시 종료하고 조건을 충족할 경우 마지막 행까지 놓은 뒤 모든 퀸을 놓았으면 정답을 +1 해준다. 자세한 내용은 아래 코드의 주석과 함께 확인하자.

### 코드

```java
import java.io.*;

public class Main {
	// 각 행에 위치한 퀸들의 열 위치
	static int[] queenColumnLocations;
	static int answer;
	static int n;

	// 대각선 위치인지 확인하는 함수
	public static boolean isDiagonal(int row, int column) {
		for(int i = 1; i < row; i++) {
			if(Math.abs(row - i) == Math.abs(column - queenColumnLocations[i])) {
				return true;
			}
		}
		return false;
	}

	// 놓을 수 있는지 확인하는 함수. 같은 열에 있는지 또는 대각선에 있는지 검사한다.
	public static boolean isPossible(int row, int column) {
		for(int i = 1; i < row; i++) {
			if(queenColumnLocations[i] == column || isDiagonal(row, column))
				return false;
		}
		return true;
	}

	// 퀸을 놓는 재귀함수 조건을 확인 후 조건을 충족하면 다음 퀸을 놓는다.
	public static void putQueen(int row, int column) {
		if(!isPossible(row, column)) {
			return;
		}
		// 마지막 행의 퀸까지 성공적으로 놓을 수 있다면 정답 카운트를 1 증가시킨다.
		if(n == row) {
			answer++;
			return;
		}
		queenColumnLocations[row] = column;
		for(int i = 1; i < n + 1; i++) {
			putQueen(row + 1, i);
		}
		queenColumnLocations[row] = 0;
	}

    public static void main(String[] args) throws IOException{
    	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    	n = Integer.parseInt(br.readLine());
    	answer = 0;
    	queenColumnLocations = new int[n + 1];

    	for(int i = 1; i < n + 1; i++) {
    		putQueen(1, i);
    	}

    	System.out.print(answer);
    }
}

```
