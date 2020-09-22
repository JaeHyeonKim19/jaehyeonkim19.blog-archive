---
title: '[컴퓨터구조론] 4. The Processor'
date: 2020-09-16 09:00:00 +0900
path: 'computerArchitecture/202009164-the-processor'
---

> 본 글은 영남대학교 최규상 교수님의 [컴퓨터 구조](http://www.kocw.net/home/cview.do?cid=184062fa9a833237) 강의를 듣고 작성된 글입니다.

### 4.1 Introduction

- CPU performance factors
	- Instruction count
		- Determined by ISA and compiler
	- CPI and Cycle time
		- Determined by CPU hardware

- We will examine two MIPS implementations
	- A simplified version
	- A more realistic pipelined version

- Instruction Execution
	- PC (program counter) -> instruction memory, fetch instruction
	- Register numbers -> register file, read registers
	- Depending on instruction class
		- Use ALU to calculate
			- Arithmetic result
			- Memory address for load/store
			- Branch target address
		- Access data memory for load/sotre
		- PC <- target address or PC + 4

- CPU Overview
	![cpu-overview](./cpu-overview.png)

### 4.2 Logic Design Conventions

- Loginc Design Basics
	- Information encoded in binary
		- Low voltage = 0, High voltage = 1
		- One wire per bit
		- Multi-bit data encoded on multi-wire buses
	- Combinational element
		- Operate on data
		- Output is a function of input
	- State (sequential) elements
		- Store information

- Clocking Methodology
	- Combinational logic transforms data during clcock cycles
		- Between clock edges
		- Input from state elements, output to state element
		- Longest delay determines clock period

### 4.3 Building a Datapath

- Building a Datapath
	- Datapath
		- Elements that process data and addresses in the CPU
			- Registers, ALUs, mux's, memories, ...
	- We will build a MIPS datapath incrementally
		- Refining the overview design

- R-Format Instructions
	- Read two register operands
	- Perform arithmetic/logical operation
	- Write register result

- Load/Store Instructions
	- Read register operands
	- Calculate address using 16-bit offset
		- Use ALU, but [sign-extend](https://en.wikipedia.org/wiki/Sign_extension) offset
	- Load: Read memory and update register
	- Store: Write register value to memory

- Branch Instructions
	- Read register operands
	- Compare operands
		- Use ALU, subtract and check Zero output
	- Calculate target address
		- Sign-extend displacement
		- Shift left 2 places (word displacement)
		- Add to PC + 4
			Already calculated by instruction fetch

- Full Datapath
	![full-datapath](./full-datapath.png)

### 4.4 A Simple Implement Scheme

- ALU Control
	- ALU used for
		- Load/Store: F = add
		- Branch: F = subtract
		- R-type: F depends on funct field
	|ALU control|Function|
	|---|---|
	|0000|AND|
	|0001|OR|
	|0010|add|
	|0110|substract|
	|0111|set-on-less-than|
	|1100|NOR|
	- Assume 2-bit ALUOp derived from opcode
		- Combinational logic derives ALU control
	![alu-control](./alu-control.png)

- The Main Control Unit
	- Control signals derived from instruction
	![the-main-control-unit](./the-main-control-unit.png)

- Datapath With Control
	![datapath-with-control](./datapath-with-control.png)

- Performance Issues
	- Longest delay determines clock period
		- Critical path: load instruction
		- Instruction memory -> register file -> ALU -> data memory -> register file
	- Not feasible to vary period for different instructions
	- Violates design principle
		- Making the common case fast
	- We will improve performance by pipelining

### 4.5 An Overview of Pipelining

- Pipelined laundry: overlapping execution
	- Parallelism improves performance

![piplelining-analogy](./pipelining-analogy.png)

- MIPS Pipeline
	- Five stages, one step per stage
		1. IF: Instruction fetch from memory
		2. ID: Instruction decode & register read
		3. EX: Execute operation or calculate address
		4. MEM: Access memory operand
		5. WB: Write result back to register

- Pipeline Performance
	- Assume time for stages is
		- 100ps for register read or write
		- 200ps for other stages
	- Compare pipelined datapath with single-cycle datapath

	![pipeline-performance](./pipeline-performance.png)

- Pipeline Performance
	![pipeline-performance-1](./pipeline-performance-1.png)

- Pipeline Speedup
	- If all stages are balanced
		- i.e., all take the same time
		- `Time between instructions(pipelined) = Time between instructions(nonpipelined) / Number of stages`
		- If not balanced, speedup is less
		- Speedup due to increased throughput
			- Latency (time for each instruction) does not decrease

- Pipelining and ISA Design
	- MIPS ISA designed for pipelining
		- All instructions are 32-bits
			- Easier to fetch and decode in one cycle
			- c.f. x86: 1 - to 17 byte instructions
		- Few and regular instruction formats
			- Can decode and read registers in one step
		- Load/store addressing
			- Can calculate address in 3nd stage, access memory in 4th stage
		- Alignment of memory operands
			- Memory access takes only one cycle

### 4.5 An Overview of Pipelining

- Hazards
	- Situations that prevent starting the next instruction in the next cycle
	- Structure hazards
		- A required resource is busy
	- Data hazard
		- Need to wait for previous instruction to complete its data read/write
	- Control hazard
		- Deciding on control action depends on previous instruction

- Structure Hazards
	- Conflict for use of a resource
	- In MIPS pipeline with a signle memory
		- Load/Store requires data access
		- Insturction fetch would have to stall for that cycle
			- Would cause a pipeline "bubble"
		- Hence, pipelined datapaths require separate instruction/data memories
			- Or seperate instruction/data caches

- Data Hazards
	- An instruction depends on completion of data access by a previous instruction
		```mips
		add $s0, $t0, $t1
		sub $t2, $s0, $t3
		```
		![data-hazards](./data-hazards.png)

- Fowarding
	- Use result when it is computed
		- Don't wait for it to be stored in a register
		- Requires extra connections in the datapath
		![forwarding](./forwarding.png)

- Load-Use Data Hazard
	- Can't always avoid stalls by forwarding
		- If value not computed when needed
		- Can't forward backward in time!
		![load-use-data-hazard](./load-use-data-hazard.png)

- Code Scheduling to Avoid Stalls
	- Reorder code to avoid use of load result in the next instruction
	- C code for A = B + E; C = B + F;
	![code-scheduling-to-avoid-stalls](./code-scheduling-to-avoid-stalls.png)
	- Data hazard는 RAW(read after write)에 발생한다
		- code dependency의 종류
			1. RAW
			2. RAR
			3. WAR
			4. WAW
	
- Control Hazards
	- Branch determines flow of control
		- Fetching next instruction depends on branch outcome
		- Pipeline can't always fetch correct instruction
			- Still working on ID stage of branch
	- In MIPS pipeline
		- Need to compare registers and compute target early in the pipeline
		- Add hardware to do it in ID stage

- Stall on Branch
	- Wait until branch outcome determined before fetching next instruction
	![stall-on-branch](./stall-on-branch.png)

- Branch Prediction
	- Longer pipelines can't readily determine branch outcome early
		- Stall penalty becomes unacceptable
	- Predict outcome of branch
		- Only stall if prediction is wrong
	- In MIPS pipeline
		- Can predict branches not taken
		- Fetch instruction after branch, with no delay

- MIPS with Predict Not Taken
	![mips-with-predict-not-taken](./mips-with-predict-not-taken.png)

- More-Realistic Branch Prediction
	- Static branch prediction
		- Based on typical branch behavior
		- Example: loop and if-statement branches
			- Predict backward branches taken
			- Predict forward branches not taken
	- Dynamic branch prediction
		- Hardware measures actual branch behavior
			- e.g., record recent history of each branch
		- Assume future behavior will continue the tred
			- When wrong, stall while re-fetching, and update history

- Pipeline Summary
	- Pipelining improves performance by increasing instruction throughput
		- Executes multiple instructions in parallel
		- Each instruction has the same latency
	- Subject to hazards
		- Structure, data, control
	- Instruction set design affects complexity of pipeline implementation

### 4.6 Pipelined Datapath and Control

- MIPS Pipelined Datapath
	![mips-pipelined-datapath](./mips-pipelined-datapath.png)

- Pipeline registers
	- Need registers between stages
		- To hold information produced in previous cycle
	![pipeline-registers](./pipeline-registers.png)

- Pipeline Operation
	- Cycle-by-cycle flow of instructions through the pipelined datapath
		- "Single-clock-cycle" pipeline diagram
			- Shows pipeline usage in a signle cycle
			- Highlight resources used
		- c.f. "multi-clock-cycle" diagram
			- Graph of operation over time
	
- Multi-Cycle Pipeline Diagram
	- Form showing resource usage
	![multi-cycle-pipeline-diagram](multi-cycle-pipeline-diagram.png)
	- Traditional form
	![multi-cycle-pipeline-diagram-traditional-form](./multi-cycle-pipeline-diagram-traditional-form.png)

- Single-Cycle Pipeline Diagram
	- State of pipeline in a given cycle
	![single-cycle0pipeline-diagram](./single-cycle-pipeline-diagram.png)

- Pipelined Control (Simplified)
	![pipelined-control-simplified](./pipelined-control-simplified.png)

- Pipelined Control
	- Control signals derived from instruction
		- As in signle-cycle implementation
	![pipelined-control](./pipelined-control.png)
	![pipelined-control-datapath](./pipelined-control-datapath.png)

### 4.7 Data Hazards: Forwarding vs Stalling

- Data Hazards in ALU Instructions
	- Consider this sequence:
		```mips
		sub $2, $1, $3
		and $12, $2, $5
		or $13, $6, $2
		add $14, $2, $2
		sw $15, 100($2)
		```
	- We can resolve hazards with forwarding
		- How do we detect when to forward?

- Dependencies & Forwarding
	![dependencies-and-forwarding](./dependencies-and0forwarding.png)

- Detecting the Need to Forward
	- Pass register numbers along pipeline
		- e.g., ID/EX.RegisterRs = register number for Rs sitting in ID/EX pipeline register
	- ALU operand register numbers in EX stage are given by
		- ID/EX.RegisterRs, ID/EX.RegisterRt
	- Data hazards when
		1. EX/MEM.RegisterRd = ID/EX.RegisterRs
		2. EX/MEM.RegisterRd = ID/EX.RegisterRt
		3. MEM/WB.RegisterRd = ID/EX.RegisterRs
		4. MEM/WB.RegisterRd = ID/EX.RegisterRt

- Detecting the Need to Foward
	- But only if forwarding instruction will write to a register!
		- EX/MEM.RegWrite, MEM/WB.RegWrite
	- And only if Rd for that instruction is not $zero
		- EX/MEM.RegisterRd != 0
		- MEM/WB.RegisterRd != 0

- Forwarding Paths
	![forwarding-paths](./forwarding-paths.png)

- Forwarding Conditions
	![forwarding-conditions](./forwwarding-conditions.png)

- Double Data Hazard
	- Consider the sequence
		```mips
		add $1, $1, $2
		add $1, $1, $3
		add $1, $1, $4
		```
	- Both hazards occur
		- Want to use the most recent
	- Revise MEM hazard condition
		- Only fwd if EX hazard condition isn't true
	
- Revised Forwarding Condition
	![revised-forwarding-condition](./revised-forwarding-condition.png)

- Datapath with Forwarding
	![datapath-with-forwarding](./datapath-with-forwarding.png)

- Load-Use Data Hazard
	![load-use-data-hazard-diagram](./load-use-hazard-diagram.png)

- Load-Use Hazard Detection
	- Check when using instruction is decoded in ID stage
	- ALU operand register numbers in ID stage are given by
		- IF/ID.RegisterRs, IF/ID.RegisterRt
	- Load-use hazard when
		- ID/EX.MemRead and ((ID/EX.RegisterRt = IF/ID.RegisterRs) or (ID/EX.RegisterRt = IF/ID.RegisterRt))
	- If detected, stall and insert bubble

- How to Stall the Pipeline
	- Force control values in ID/EX register to 0
		- EX, MEM, and WB do nop (no-operation)
	- Prevent update of PC and IF/ID register
		- Using instruction is decoded again
		- Following instruction is fetched again
		- 1-cycle stall allows MEM to read data for lw
			- Can subsequently forward to EX stage

- Stall/Bubble in the Pipeline
	- simplified
	![stall-bubble-in-the-pipeline](./stall-bubble-in-the-pipeline.png)
	- real
	![stall-bubble-in-the-pipeline-real](./stall-bubble-in-the-pipeline-real.png)

- Datapath with Hazard Detection
	![datapath-with-hazard-detection](./datapath-with-hazard-detection.png)

- Stalls and Performance
	- Stalls reduce performance
		- But are required to get correct results
	- Compiler can arrange code to avoid hazards and stalls
		- Requires knowledge of the pipeline structure

- Branch Hazards
	- If branch outcome determined in MEM
		![branch-hazards](./branch-hazards.png)

- Reducing Branch Delay
	- Move hardware to determine outcome to ID stage
		- Target address adder
		- Register address adder

- Example: Branch Taken
	![example-branch-taken](./example-branch-taken.png)
