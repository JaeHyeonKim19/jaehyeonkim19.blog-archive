---
title: '[자바]프로그래머스 크레인 인형뽑기 게임'
date: 2020-04-08 09:00:00 +0900
path: 'codingtest/20200408programmers_claw_machine_game'
---

```java
import java.util.Stack;

class Solution {
	public int solution(int[][] board, int[] moves) {
		int answer = 0;
		Stack<Integer> s = new Stack<Integer>();
		for (int i = 0; i < moves.length; i++) {
			int currentIndex = moves[i] - 1;
			for (int j = 0; j < board.length; j++) {
				if (board[j][currentIndex] != 0) {
					if (!s.isEmpty() && board[j][currentIndex] == s.peek()) {
						s.pop();
						answer += 2;
					} else {
						s.push(board[j][currentIndex]);
					}
					board[j][currentIndex] = 0;
					break;
				}
			}
		}
		return answer;
	}
}
```
