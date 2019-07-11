/* AlbionFair.js -- Zachary Whelpley
 * 
 * This program is designed to read in fields from a PDF, 
 * specifically Department numbers and identify the corresponding
 * Department heads that should be notified, then send the email to
 * a generic email, and CC all the relevant department heads
 */
var cToAddr = "albionfairforms@gmail.com";

var i; //Counter for Loops
var NumOfDepEntries = 15;//<--This should be the last Dept#
						 // the traditional count would be 
						 // this number +1 (ie. 16)

/*Dept Heads are listed below
 * again, think of this from
 * right to left <<<----
 * where each email is sudo-named by
 * the multiple dept's it heads
 */
var DeptHead1_2_3 = "terry@gmail.com";
var DeptHead4_5_6 = "jake@gmail.com";
var DeptHead9_10 = "raymond@gmail.com";

/*Array of heads, 
 */
var DeptHeads = [ 	DeptHead1_2_3, 
					DeptHead4_5_6, 
					DeptHead9_10
				];

/* Boolean Trap for each department head
 * These Heads should reflect commonalities - as in 1
 * person running multipe depts gets 1 boolean (1 email)
 * 
 * The naming mechanism should be identical for
 * both SendToDeptHead### and DeptHead### as well
 * as their respective array orders, its not proper
 * but we will assume a parallelism here between
 * lists, and any editing should reflect that
 */
var SendToDeptHead1_2_3 = new Boolean(false);
var SendToDeptHead4_5_6 = new Boolean(false);
var SendToDeptHead9_10 = new Boolean(false);

//array of bools -- Again: IDENTICAL NAMING MECHANISM -- PARALLEL!
var SendBools = [	SendToDeptHead1_2_3,
					SendToDeptHead4_5_6,
					SendToDeptHead9_10
				];


//get Exhibitor number
var ExNum = this.getField("Exhibitor").value; 

//create list of Departments - all empty values
var DeptListing = [
	Dept0,  Dept1,  Dept2,  Dept3,  
	Dept4,  Dept5,  Dept6,  Dept7,  
	Dept8,  Dept9,  Dept10, Dept11, 
	Dept12, Dept13, Dept14, Dept15
];

//assign value to those list indexs
var deptString = "";
for(i = 0; i <=NumOfDepEntries; i++){
	deptString = "Dept." + i;
	DeptListing[i] = this.getField(deptString).value;
}

//ccAddress is blank
var cCCAddr = "";


//"for all of the Data Entries in DeptListing..."
for(i = 0; i<=NumOfDepEntries; i++){
	//"...find what that value is..."
	switch(DeptListing[i]){
		//"...and if it was 1...""
		case 1:
			//"...Flip Dept 1's switch to true...""
			SendToDeptHead1_2_3 = true;
			//jump to end
			break;
		//"...if it were a 2..."
		case 2:
			//"So on and so forth"
			SendToDeptHead1_2_3 = true;
			break;
		case 3:
			SendToDeptHead1_2_3 = true;
			break;
		case 4:
			SendToDeptHead4_5_6 = true;
			break;
		case 5:
			SendToDeptHead4_5_6 = true;
			break;
		case 6:
			SendToDeptHead4_5_6 = true;
			break;
		case 9:
			SendToDeptHead9_10 = true;
			break;
		case 10:
			SendToDeptHead9_10 = true;
			break;
		//if it were none of those ^^
		default:
			//do nothing
			console.log("Something must be wrong here");
			break;
	}
}

cCCAddr += cToAddr; //CC to self for the sake of Fence Posting

/*This is a fencepost mechanism - attaching ", nextAddress" to the CCAddress
 * it is necessary for there to first be an initial address to fencepost on
 * and instead of using a bunch of if's to figure out who the first valid Dept
 * head is, we'll just assign the dummy email
 */
for (i = 0; i < SendBools.length; i++){
	if(SendBools[i]){
		cCCAddr += String(", " + DeptHeads[i];
	}
}

console.log(cCCAddr); //Check this is in the right format

//This should look familiar
var cSubLine = "AAF Entry Form Exhibitor Number:" + ExNum;
var cBody = "Please find attached entry form.\nThe data entered indicates at least one data entry is relevant to your department";

//YEET!
this.mailDoc({bUI: true; cTo: cToAddr, cCc: cCCAddr, cSubject: cSubLine, cMsg: cBody});
