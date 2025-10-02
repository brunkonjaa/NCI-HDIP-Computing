/*

ShopApp1.java

L Murphy

2.10.2025

*/

//CTRL+M - BRINGS YOU TO REPRESENTING BRACKET

import java.util.*;//bringing in a package that we can use for user input

public class ShopApp1{

	//main commmand - play - runs the application

	public static void main(String[]args){

		//objects

		//bringing in the scanner and giving it the name keyboard

		//created an instance of the scanner class so that we can use it within our application here

		//system.in - allow for user input

		Scanner keyboard=new Scanner(System.in);

		//varaiables

		//storing the cost price of each item

		final double APPLEPRICE = 0.50;

		final double BANANAPRICE = 0.30;

		final double MILKPRICE = 1.20;

		final double BREADPRICE = 2.00;

		//storing the amount of each product coming in from the user

		int apples;

		int bananas;

		int milk;

		int bread;

		//storing the total cost of the shopping

		double total;

//INPUT

//asks the question

System.out.println("How many Apples would you like? (type in whole intergers please)");

//Grabbing the integer from the user and storing it in a variable

apples=keyboard.nextInt();

System.out.println("How many Bananas would you like? (type in whole intergers please)");

bananas=keyboard.nextInt();

System.out.println("How much Milk would you like? (type in whole intergers please)");

milk=keyboard.nextInt();

System.out.println("How much Bread would you like? (type in whole intergers please)");

bread=keyboard.nextInt();

//PROCESS

total=(APPLEPRICE*apples)+(BANANAPRICE*bananas)+(MILKPRICE*milk)+(BREADPRICE*bread);


//OUTPUT

System.out.println("Go raibh maith agat go mor mor, the total of your shopping is "+total);


	} //closes off the main method

}//CLOSES CLASS SIGNATURE - TYPE OF ERROR - REACHED END WHILE PARSING