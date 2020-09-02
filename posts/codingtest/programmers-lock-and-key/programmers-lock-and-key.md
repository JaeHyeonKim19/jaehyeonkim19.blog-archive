---
title: '[2020 카카오 공채] 자물쇠와 열쇠'
date: 2020-08-24 09:00:00 +0900
path: 'codingtest/20200824programmers-lock-and-key'
---

### 문제

[자물쇠와 열쇠(클릭)](https://programmers.co.kr/learn/courses/30/lessons/60059)

### 풀이

이 문제는 키를 자유롭게 돌리고 움직여서 자물쇠를 열 수 있는지 판별하는 문제이다. 모든 경우의 수를 순회하며 가능여부를 판별해야하는데 필자는 다음과 같은 방식으로 순회했다.

- 키를 4방향으로 돌려가면서 확인한다.
	- 키의 일부만 자물쇠랑 겹쳐도 되기 때문에 제일 끝 한칸만 겹치는 경우를 고려해 행 과 열 모두 0 ~ m + n - 1 범위에서 순차적으로 키를 위치시키고 자물쇠를 열 수 있는지 확인한다.
		- 자물쇠를 순회하면서 열 수 있는지 확인한다.
			- 겹친 부분은 홈과 돌기가 맞물려야 한다. 즉, 둘 다 홈이거나 둘다 돌기인 경우는 자물쇠를 열 수 없다.
			- 겹치지 않은 부분은 자물쇠가 돌기로 이루어져 있어야한다. 자물쇠의 홈이 열쇠의 돌기로 채워지지 않으면 자물쇠를 열 수 없다.
			- 순회하는 중 열수 없음이 확인되면 순회를 멈추고 키를 다음 위치로 이동시켜서 계속 확인한다.
			- 모두 순회하여 자물쇠를 열 수 있음이 확인되면 true를 리턴하고 실행을 종료한다.
		- 해당 위치에서 자물쇠를 열 수 없으면 키를 다음 위치로 이동시킨 후 다시 자물쇠를 순회하며 확인한다.
	- 키가 모든 위치에서 자물쇠를 열 수 없다면 키를 90도 회전시킨 후 다시 확인한다.
- 4방향에서 모두 자물쇠를 열 수 없음이 확인되면 주어진 키로는 자물쇠를 열 수 없으므로 false를 반환하고 실행을 종료한다.

위 내용을 기억하고 아래 코드를 살펴보자.

### 코드

```java
class Solution {
	private int[][] getRotatedKey(int[][] key, int rotateCount) {
		int m = key.length;
		int[][] rotatedKey = new int[m][m];
		for(int x = 0; x < m; x++) {
			for(int y = 0; y < m; y++) {
				int [] rotatedCoordinate = rotateCoordiante(x, y, rotateCount, m);
				rotatedKey[rotatedCoordinate[0]][rotatedCoordinate[1]] = key[x][y];
			}
		}
		return rotatedKey;
	}

	private int[] rotateCoordiante(int x, int y, int rotateCount, int m) {
		int[] coordinate = new int[2];
		if(rotateCount == 0) {
			coordinate[0] = x;
			coordinate[1] = y;
			return coordinate;
		}
		coordinate[0] = y;
		coordinate[1] = - x + m - 1;
		if(rotateCount == 1) {
			return coordinate;
		}
		return rotateCoordiante(coordinate[0], coordinate[1], rotateCount - 1, m);
	}

	private boolean isOverlap(int m, int i, int j, int x, int y) {
		return m - 1 - i + x >= 0
				&& m - 1 - i + x < m
				&& m - 1 - j + y >= 0
				&& m - 1 - j + y < m;
	}

	private boolean isCorrect(int[][] rotatedKey, int[][] lock, int i, int j) {
		int m = rotatedKey.length;
    	int n = lock.length;

		for(int x = 0; x < n; x++) {
			for(int y = 0; y < n; y++) {
				if(isOverlap(m, i, j, x, y)) {
					if(lock[x][y] + rotatedKey[m - 1 - i + x][m - 1 - j + y] != 1) {
						return false;
					}
				}else {
					if(lock[x][y] == 0) {
						return false;
					}
				}
			}
		}

		return true;
	}

	private boolean isCorrectKey(int[][] rotatedKey, int[][] lock) {
		int m = rotatedKey.length;
    	int n = lock.length;

		for(int i = 0; i < m + n - 1; i++) {
			for(int j = 0; j < m + n - 1; j++) {
				if(isCorrect(rotatedKey, lock, i, j)) {
					return true;
				}
			}
		}

		return false;
	}

    public boolean solution(int[][] key, int[][] lock) {
    	int m = key.length;
    	int n = lock.length;
    	int[][] rotatedKey;

    	for(int rotateCount = 0; rotateCount < 4; rotateCount++) {
    		rotatedKey = getRotatedKey(key, rotateCount);
    		if (isCorrectKey(rotatedKey, lock)) {
    			return true;
    		}
    	}

        return false;
    }
}
```
