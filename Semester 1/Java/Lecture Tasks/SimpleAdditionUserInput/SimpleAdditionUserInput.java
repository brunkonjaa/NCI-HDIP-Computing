import javax.swing.JOptionPane;
public class SimpleAdditionUserInput{
	public static void main(String[] args){
		/*Fill in the gaps in code by replacing the **** sections*/
		//addition
		int x=Integer.parseInt(JOptionPane.showInputDialog(null,"Enter a number"));
		int y=Integer.parseInt(JOptionPane.showInputDialog(null,"Enter a number"));
		int ans=x+y;
		//print
		System.out.println(ans);
	}
}