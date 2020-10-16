---
title: '[2020 카카오 공채] 기둥과 보 설치'
date: 2020-09-02 09:00:00 +0900
path: 'codingtest/20200902programmers-install-pillar-and-beam'
---

### 문제

[기둥과 보 설치(클릭)](https://programmers.co.kr/learn/courses/30/lessons/60061)

### 풀이

처음 풀 때는 기둥 또는 보를 설치, 삭제 할 때 마다 주변의 보와 기둥이 조건을 충족하는지 확인하는 식으로 구현을 했다. 하지만 이 경우 조건식이 너무 복잡하고 난해해져 구현할 수 없었다.

다른 풀이를 참고하니 설치, 삭제를 하고 전체 기둥과 보를 순회하면서 유효한지를 확인하는 식으로 구현하고 있었다. 해당 방식으로 구현하니 훨씬 간결하게 문제를 해결할 수 있었다.

### 코드

```java
class Solution {
	private boolean[][] isColumn;
	private boolean[][] isBeam;
	private int column = 0;
	private int beam = 1;

	private int[] getStructureInfoArray(int x, int y, int structure) {
		int[] buildFrame = {x, y, structure};
		return buildFrame;
	}

	private boolean canRemove(int[] currentBuildFrame) {
		removeBuildFrame(currentBuildFrame);

		for(int i = 0; i < isColumn.length; i++) {
			for(int j = 0; j < isColumn[0].length; j++) {
				if(isColumn[i][j]) {
					if(!isValid(getStructureInfoArray(i, j, column))) {
						installBuildFrame(currentBuildFrame);
						return false;
					}
				}
			}
		}

		for(int i = 0; i < isBeam.length; i++) {
			for(int j = 0; j < isBeam[0].length; j++) {
				if(isBeam[i][j]) {
					if(!isValid(getStructureInfoArray(i, j, beam))) {
						installBuildFrame(currentBuildFrame);
						return false;
					}
				}
			}
		}

		installBuildFrame(currentBuildFrame);
		return true;
	}

	private boolean isValid(int[] currentBuildFrame) {
		if(isColumn(currentBuildFrame)) {
			if(currentBuildFrame[1] == 0) {
				return true;
			}
			if(isBeam[currentBuildFrame[0]][currentBuildFrame[1]] || (currentBuildFrame[0] - 1 >= 0 && isBeam[currentBuildFrame[0] - 1][currentBuildFrame[1]])) {
				return true;
			}
			if(isColumn[currentBuildFrame[0]][currentBuildFrame[1] - 1]) {
				return true;
			}
			return false;
		}
		if(isColumn[currentBuildFrame[0]][currentBuildFrame[1] - 1] || isColumn[currentBuildFrame[0] + 1][currentBuildFrame[1] - 1]) {
			return true;
		}
		if(currentBuildFrame[0] - 1 >= 0 && isBeam[currentBuildFrame[0] - 1][currentBuildFrame[1]] && isBeam[currentBuildFrame[0] + 1][currentBuildFrame[1]]) {
			return true;
		}
		return false;
	}

	private boolean isInstallationCommand(int[] currentBuildFrame) {
		return currentBuildFrame[3] == 1;
	}

	private void installBuildFrame(int[] currentBuildFrame) {
		if(isColumn(currentBuildFrame)) {
			isColumn[currentBuildFrame[0]][currentBuildFrame[1]] = true;
			return;
		}
		isBeam[currentBuildFrame[0]][currentBuildFrame[1]] = true;
	}

	private void removeBuildFrame(int[] currentBuildFrame) {
		if(isColumn(currentBuildFrame)) {
			isColumn[currentBuildFrame[0]][currentBuildFrame[1]] = false;
			return;
		}
		isBeam[currentBuildFrame[0]][currentBuildFrame[1]] = false;
	}

	private boolean isColumn(int[] currentBuildFrame) {
		return currentBuildFrame[2] == column;
	}

    public int[][] solution(int n, int[][] build_frame) {
    	isColumn = new boolean[n + 1][n + 1];
    	isBeam = new boolean[n + 1][n + 1];
    	int structureCount = 0;

    	for(int i = 0; i < build_frame.length; i++) {
    		int[] currentBuildFrame = build_frame[i];
    		if(isInstallationCommand(currentBuildFrame)) {
    			if(isValid(currentBuildFrame)) {
    				installBuildFrame(currentBuildFrame);
    				structureCount++;
    				continue;
    			}
    			continue;
    		}
    		if(canRemove(currentBuildFrame)) {
    			removeBuildFrame(currentBuildFrame);
    			structureCount--;
    			continue;
    		}
    	}

    	int[][] currentStructureArray = new int[structureCount][3];
    	int currentStructureArrayIndex = 0;

    	for(int i = 0; i < isBeam.length; i++) {
    		for(int j = 0; j < isBeam[0].length; j++) {
    			if(isColumn[i][j]) {
    				currentStructureArray[currentStructureArrayIndex++] = getStructureInfoArray(i, j, column);
    			}
    			if(isBeam[i][j]) {
    				currentStructureArray[currentStructureArrayIndex++] = getStructureInfoArray(i, j, beam);
    			}
    		}
    	}

        return currentStructureArray;
    }
}

```
