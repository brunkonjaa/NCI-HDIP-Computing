import javax.swing.JOptionPane;

public class BirthYearApp2 {
    public static void main(String[] args) {
        // declare vars
        int age;
        int year;
        int yearBorn;

        // inputs
        age  = Integer.parseInt(JOptionPane.showInputDialog(null, "Enter your age"));
        year = Integer.parseInt(JOptionPane.showInputDialog(null, "Enter the current year"));

        // process
        yearBorn = year - age;

        // output
        JOptionPane.showMessageDialog(null, "You were born in: " + yearBorn);
    }
}