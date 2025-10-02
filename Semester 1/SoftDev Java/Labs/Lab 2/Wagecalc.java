import javax.swing.JOptionPane;
public class Wagecalc {
	public static void main(String[] args) {
		// variables
		double monthlyWage;
		double weeklyHours;
		double yearlyWage;
		double hourlyWage;

		// inputs
		monthlyWage = Double.parseDouble(JOptionPane.showInputDialog(null, "Enter your monthly wage:"));
		weeklyHours = Double.parseDouble(JOptionPane.showInputDialog(null, "Enter your weekly hours:"));

		// process
		yearlyWage = monthlyWage * 12;
		hourlyWage = yearlyWage / (weeklyHours * 52);

		// output
		JOptionPane.showMessageDialog(null, "Your yearly wage is: €" + String.format("%.2f", yearlyWage));
		JOptionPane.showMessageDialog(null, "Your hourly wage is: €" + String.format("%.2f", hourlyWage));
	}
}