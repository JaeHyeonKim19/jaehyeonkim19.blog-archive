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
	![dependencies-and-forwarding](./dependencies-and-forwarding.png)

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

### 4.8 Control Hazards

- Data Hazards for Branches
	- If a comparison register is a destination of 2nd or 3rd preceding ALU instruction
	![data-hazards-for-branches](./data-hazards-for-branches.png)
	- Can resolve using forwarding
	- If a comparison register is a destination of preceding ALU instruction or 2nd preceding load instruction
		- Need 1 stall cycle
	![data-hazards-for-branches-1-stall](./data-hazards-for-branches-1-stall.png)
	- If a comparison register is a destination of immediately preceding load instruction
		- Need 2 stall cycles
	![data-hazards-for-branches-2-stall](./data-hazards-for-branches-2-stall.png)

- Dynamic Branch Prediction
	- In deeper and superscalar pipelines, branch penalty is more significant
	- Use dynamic prediction
		- Branch prediction buffer (aka branch history table)
		- Indexed by recent branch instruction addresses
		- Stores outcome (taken/not taken)
		- To execute a branch
			- Check table, expect the same outcome
			- Start fetching from fall-through or target
			- If wrong, flush pipeline and flip prediction

- 1-Bit Predictor: Shortcoming
	- Inner loop branches mispredicted twice
		- Mispredict as taken on last iteration of inner loop
		- Then mispredict as not taken on first iteration of inner loop next time around

- 2-Bit predictor
	- Only change prediction on two successive mispredicitions
	![2-bit-predictor](./2-bit-predictor.png)

- Calculating the Branch Target
	- Even with predictor, still need to calculate the target address
		- 1-cycle penalty for a taken branch
	- Branch target buffer
		- Cache of target addresses
		- Indexed by PC when instruction fetched
			- If hit and instruction is branch predicted taken, can fetch target immediately

### 4.9 Exceptions

- Exceptions and Interrupts
	- "Unexpected" events requiring change in flow of control
		- Different ISAs use the terms differently
	- Exception
		- Arises within the CPU
			- e.g., undefined opcode, overflow, syscall, ...
	- Interrupt
		- From an external I/O controller
	- Trap (Software Interrupt)
		- System call을 사용할 때 발생, 소프트웨어가 명령어를 수행할 때 interrupt가 발생하는 것
	- Dealing with them without sacrificing performance is hard

- Handling Exceptions
	- In MIPS exceptions managed by a System Control Coprocessor (CP0)
	- Save PC of offending (or interrupted) instruction
		- In MIPS: Exception Program Counter (EPC)
	- Save indication of the problem
		- In MIPS: Cause register
		- We'll assume 1-bit
			- 0 for undefined opcode,1 for overflow
	- Jump to handler at 8000 00180

- An Alternate Mechanism
	- Vectored Interrupts
		- Handler address determined by the cause
	- Example:
		- Undefined opcode: C000 0000
		- Overflow: C000 0020
		- ...: C000 0040
	- Instructions either
		- Deal with the interrupt, or
		- Jump to real handler

- Handler Actions
	- Read cause, and transfer to relevant handler
	- Determine action required
	- If restartable
		- Take corrective action
		- use EPC to return to program
	- Otherwise
		- Terminate program
		- Report error using EPC, cause, ...

- Exceptions in a Pipeline
	- Another form of control hazard
	- Consider overflow on add in EX stage
		- add $1, $2, $1
		- Prevent $1 from being clobbered
		- Complete previous instructions
		- Flush add and subsequent instructions
		- Set Cause and EPC register values
		- Transfer control to handler
	- Similar to mispredicted branch
		- Use much of the same hardware

- Pipeline with Exceptions
	![pipeline-with-exceptions](./pipeline-with-exceptions.png)

- Exception Properties
	- Restartable exceptions
		- Pipeline can flush the instruction
		- Handler executes, then returns to the instruction
			- Refetched and executed from scratch
	- PC saved in EPC register
		- Identifies causing instruction
		- Actually PC + 4 is saved
			- Handler must adjust

- Exception Example
	![exception-example](./exception-example.png)
	![exception-example-flushed](./exception-example-flushed.png)

- Multiple Exceptions
	- Pipelining overlaps multiple instructions
		- Could have multiple exceptions at once
	- Simpe approach: deal with exception from earliest instruction
		- Flush subsequent instructions
		- "Precise" exceptions
	- In complex pipelines
		- Multiple instructions issued per cycle
		- Out-of-order completion
		- Maintaining precise exceptions is difficult

- Imprecise Exceptions
	- Just stop pipeline and save state
		- Including exception cause(s)
	- Let the handler work out
		- Which instruction(s) had exceptions
		- Which to complete or flush
			- May require "manual" completion
	- Simplifies hardware, but more complex handler software
	- Not feasible for complex multiple-issue out-of-order pipelines

### 4.10 Parallelism via Instructions

- Instruction-Level Parallelism (ILP)
	- Pipelining: executing multiple instructions in parallel
	- To increase ILP
		- Deeper pipeline
			- Less work per stage -> shorter clock cycle
		- Multiple issue
			- Replicate pipeline stages -> multiple pipelines
			- Start multiple instructions per clock cycle
			- CPI < 1, so use Instructions Per Cycle (IPC)
			- E.g., 4GHz 4-way multiple-issue
				- 16 BIPS, peak CPI = 0.25, peak IPC = 4
			- But dependencies reduce this in practice

- Multiple Issue
	- Static multiple issue
		- Compiler groups instructions to be issued together
		- Packages them into "issue slots"
		- Compiler detects and avoids hazards
	- Dynamic multiple issue
		- CPU examines instruction stream and cooses instructinos to issue each cycle
		- Compiler can help by reordering instructions
		- CPU resolves hazards using advanced techniques at runtime

- Speculation
	- "Guess" what to do with an instruction
		- Start operation as soon as possible
		- Check whether guess was right
			- If so, complete the operation
			- If not, roll-back and do the right thing
	- Common to static and dynamic multiple issue
	- Examples
		- Speculate on branch outcome
			- Roll back if path taken is different
		- Speculate on load
			- Roll back if location is updated

- Compiler/Hardware Speculation
	- Compiler can reorder instructions
		- e.g., move load before branch
		- Can include "fix-up" instructions to recover from incorrect guess
	- Hardware can loock ahead for instructions to execute
		- Buffer results until it determines they are actually needed
		- Flush buffers on incorrect speculation

- Speculation and Exceptions
	- What if exception occurs on a speculatively executed instruction?
		- e.g., speculative load before null-pointer check
	- Static speculation
		- Can add ISA support for deferring exceptions
	- Dynamic speculation
		- Can buffer exceptions untill instruction completion (which may not occur)

- Static Multiple Issue
	- Compiler groups instructions into "issue packets"
		- Group of instructions that can be issued on a signle cycle
		- Determined by pipeline resources required
	- Think of an issue packet as a very long instruction
		- Specifies multiple concurrent operations
			- Very Long Instruction Word (VLIW)

- Scheduling Static Multiple Issue
	- Compiler must remove some/all hazards
		- Reorder instructions into issue packets
		- No dependencies with a packet
		- Possibly some dependencies between packets
			- Varies between ISAs; compiler must know!
		- Pad with nop if necessary

- MIPS with Static Dual Issue
	- Two-issue packets
		- One ALU/branch instruction
		- One load/store instruction
		- 64-bit aligned
			- ALU/branch, then load/store
			- Pad an unused instruction with nop
		![mips-with-static-dual-issue](./mips-with-static-dual-issue.png)

- MIPS with Static Dual Issue (Datapath)
	![mips-with-static-dual-issue-datapath](./mips-with-static-dual-issue-datapath.png)

- Hazards in the Dual-Issue MIPS
	- More instructions executing in parallel
	- EX data hazard
		- Forwarding avoided stalls with single-issue
		- Now can't use ALU result in load/store in same packet
			```mips
			add $t0, $s0, $s1
			load $s2, 0($t0)
			```
			- split into two packets, effectively a stall
		- Load-use hazard
			- Still one cycle use latency, but now two instructions
		- More aggressive scheduling required

- Scheduling Example
	- Schedule this for d ual-issue MIPS
		![scheduling-example](./scheduling-example.png)
		- IPC = 5/4 = 1.25 (c.f. peak IPC = 2)

- Loop Unrolloing
	- pass

- Dynamic Multiple Issue
	- "Superscalar" processors
	- CPU decides whether to issue 0, 1, 2, ... each cycle
		- Avoiding structural and data hazards
	- Avoids the need for compiler scheduling
		- Though it may still help
		- Code semantics ensured by the CPU

- Dynamic Pipeline Scheduling
	- Allow the CPU to execute instructions out of order to avoid stalls
		- But commit result to registers in order
		- Example
			```mips
			lw $t0, 20($s2)
			addu $t1, $t0, $t2
			sub $s4, $s4, $t3
			slti $t5, $s4, 20
			```
			- Can start sub while addu is waiting for lw

- Dynamically Scheduled CPU
	![dynamically-scheduled-cpu](./dynamically-scheduled-cpu.png)

- Register Renaming
	- Reservation stations and reorder buffer effectively provide register renaming
	- On instruction issue to reservation station
		- If operand is available in register file or reorder buffer
			- Copied to reservation station
			- No longer required in the register; can be overwritten
		- If operand is not yet available
			- It will be provided to the reservation station by a function unit
			- Register update may not be required

- Speculation
	- Predict branch and continue issuing
		- Don't commit until branch outcome determined
	- Load speculation
		- Avoid load and cache miss delay
			- predict the effective address
			- predict loaded value
			- Load before completing outstanding stores
			- Bypass stored values to load unit
		- Don't commit load until speculation cleared

- Why Do Dynamic Scheduling?
	- Why not just let the compiler schedule code?
		- Not all stalls are predicable
			- e.g., cache misses
		- Can't always schedule around branches
			- Branch outcome is dynamically determined
		- Different implementations of an ISA have different latencies and hazards

- Does Multiple Issue Work?
	- Yes, but not as much as we'd like
	- Programs have real dependencies that limit ILP
	- Some depnedencies are hard to eliminate
		- e.g., pointer aliasing
	- Some parallelism is hard to expose
		- Limited window size during instruction issue
	- Memory delays and limited bandwith
		- Hard to keep pipelines full
	- Speculation can help if done well

- Power Efficiency
	- Complexity of dynamic scheduling and speculations requires powew
	- Multiple simpler cores may be better

### 4.11 Real Stuff: The ARM Cortex-A8 and Intel COre i7 Pipelines

- pass

### 4.12 Instruction-Level Parallelism and Matrix Multiply

- pass

### 4.14 Fallacies and Pitfalls

- Fallacies
	- Pipelining is easy (!)
		- The basic idea is easy
		- The devil is in the details
			- e.g., detecting data hazards
	- Pipelining is independent of technology
		- So why haven't we always done pipelining?
		- More transistors make more advanced techniques feasible
		- Pipeline-realted ISA design needs to take account of technology trends
			- e.g., predicated instructions

- Pitfalls
	- Poor ISA design can make pipelining harder
		- e.g., complex instruction sets (VAX, IA-32)
			- Significant overhead to make pipelining work
			- IA-32 micro-op approach
		- e.g., complex addressing modes
			- Register update side effects, memory indirection
		- e.g., delayed branches
			- Advanced pipelines have long delay slots

### 4.15 Concluding Remarks

- Concluding Remarks
	- ISA influences design of datapath and control
	- Datapath and control influence design of ISA
	- Pipelining improves instructino throughput using parallelism
		- More instructions completed per second
		- Latency for each instruction not reduced
	- Hazards: structural, data, control
	- Multiple issue and dynamic scheduling (ILP)
		- Dependencies limit achievable parallelism
		- Complexity leads to the power wall