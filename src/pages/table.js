import SideMenu from "@/components/SideMenu"
import styles from "@/styles/Home.module.css"

export default function table(){
    return(
        <div>        
            <SideMenu option1="back" route1="classroom"></SideMenu>
            <main className={styles.main}>
                <label>How many columns: </label>
                <input type="number"></input>
                <label>How many rows: </label>
                <input type="number"></input>
            </main>
            
        </div>
    )
}