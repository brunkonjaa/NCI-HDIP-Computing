import javax.swing.JOptionPane;

public class BirthYearApp {
	public static void main(String[] args) {
        String ageStr  = JOptionPane.showInputDialog(null, "Enter your age (no cheating now, just round numbers and no decimal points please):");
        if (ageStr == null) return; // user cancelled

        String yearStr = JOptionPane.showInputDialog(null, "Enter the current year (in the following format please 2025):");
        if (yearStr == null) return; // user cancelled

        try {
            int age = Integer.parseInt(ageStr.trim());
            int currentYear = Integer.parseInt(yearStr.trim());

            if (age < 0 || currentYear <= 0) {
                JOptionPane.showMessageDialog(null, "Please enter positive whole numbers please, no need for technicalities.");
                return;
            }

            int birthYear = currentYear - age;
            JOptionPane.showMessageDialog(null, "You were (apparently 😉) born in year " + birthYear + ".");
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(null, "Enter whole numbers only please, no drama here with decimal points please or words.", "Input error",
                    JOptionPane.ERROR_MESSAGE);
        }
    }
}
