import javax.swing.JOptionPane;

public class SimpleAdditionUserInput_Answer_in_Java_window {
    public static void main(String[] args) {
        // read two numbers as text
        String sx = JOptionPane.showInputDialog(null, "Enter the first number:");
        if (sx == null) return; // user canceled

        String sy = JOptionPane.showInputDialog(null, "Enter the second number:");
        if (sy == null) return; // user canceled

        try {
            // convert to ints and add
            int x = Integer.parseInt(sx.trim());
            int y = Integer.parseInt(sy.trim());
            int ans = x + y;

            // show the answer in a dialog (not console)
            JOptionPane.showMessageDialog(
                null,
                x + " + " + y + " = " + ans,
                "Result",
                JOptionPane.INFORMATION_MESSAGE
            );
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(
                null,
                "Please enter whole numbers only.",
                "Input error",
                JOptionPane.ERROR_MESSAGE
            );
        }
    }
}
