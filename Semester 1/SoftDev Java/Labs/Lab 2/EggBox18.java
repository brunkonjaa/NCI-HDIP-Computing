import javax.swing.JOptionPane;
public class EggBox18 {
	public static void main(String[] args){
		//variables
		int eggs;
		int boxSize;
		int numBoxes;
		int leftOverEggs;
		//inputs
		eggs=Integer.parseInt(JOptionPane.showInputDialog(null,"Enter a number of eggs"));
		boxSize=18;
		//process
		numBoxes=eggs/boxSize;
		leftOverEggs=eggs%boxSize;
		//output
		JOptionPane.showMessageDialog(null,"Number of boxes needed "+numBoxes);
		JOptionPane.showMessageDialog(null,"Number of eggs left over "+leftOverEggs);
	}
}