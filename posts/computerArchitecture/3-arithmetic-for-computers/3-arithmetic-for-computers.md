---
title: '[컴퓨터구조론] 3. Arithmetic for Computers'
date: 2020-09-14 09:00:00 +0900
path: 'computerArchitecture/202009143-arithmetic-for-computers'
---

> 본 글은 영남대학교 최규상 교수님의 [컴퓨터 구조](http://www.kocw.net/home/cview.do?cid=184062fa9a833237) 강의를 듣고 작성된 글입니다.

### 3.1 Introduction

### 3.2 Addition and Subtraction

- Integer Addition
	- Overflow if result out of range
		- Adding +ve and -ve operands, no overflow
		- Adding two +ve operands
			- Overflow if result sign is 1
		- Adding tow -ve operands
			-Overflow if result sign is 0

- Integer Subtraction
	- Add negation of second operand
	- Overflow is result out of range
		- Subtracting two +ve or two -ve operands, no overflow
		- Subtracting +ve from -ve operand
			- Overflow if result sign is 0
		- Subtracting -ve from +ve operand
			- Overflow if result sign is 1

- Dealing with Overflow
	- Some languages(e.g., C) ignore overflow
		- Use MIPS addu, addui, subu instructions

	- Other languages(e.g., Ada, Fortran) require raising an exception

- Arithmetic for Multimedia
	- Graphics and media processing operates on vectors of 8-bit and 16-bit data
		- Use 64-bit adder, with partitioned carry chain
			- Operate on 8\*8-bit, 4\*16-bit, or 2*32-bit vectors
			- SIMD (single-instruction, multiple-data)
	- Saturating operations
		- On overflow, result is larges representable value
		- E.g., clipping in audio, saturation in video

### 3.3 Multiplication

![multiplication](./multiplication.png)

### 3.4 Division

![division](./division.png)
