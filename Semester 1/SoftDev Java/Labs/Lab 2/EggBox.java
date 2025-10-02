//fix the code by figuring out what should be in the **** sections
import javax.swing.JOptionPane;
public class EggBox{
	public static void main(String[] args){
		//variables
		int eggs;
		int boxSize;
		int numBoxes;
		int leftOverEggs;
		//inputs
		eggs=Integer.parseInt(JOptionPane.showInputDialog(null,"Enter a number of eggs"));
		boxSize=6;
		//process
		numBoxes=eggs/boxSize;
		leftOverEggs=eggs%boxSize;
		//output
		JOptionPane.showMessageDialog(null,"Number of boxes needed "+numBoxes);
		JOptionPane.showMessageDialog(null,"Number of eggs left over "+leftOverEggs);
	}
}