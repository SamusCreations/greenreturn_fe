import { MaterialIcon } from "../../assets/Icons";
import Sidebar, { SidebarItem } from "../Layout/Sidebar";

export function UserSettings() {
  return (
    <div>
      <Sidebar>
        <SidebarItem
          icon={
            <MaterialIcon
              className="text-warning"
              fill="currentColor"
              size={30}
            />
          }
          text="Materials"
          href="/material"
          active
        />
        <SidebarItem
          icon={
            <MaterialIcon
              className="text-warning"
              fill="currentColor"
              size={30}
            />
          }
          text="Materials"
          href="/material"
        />
        <SidebarItem
          icon={
            <MaterialIcon
              className="text-warning"
              fill="currentColor"
              size={30}
            />
          }
          text="Materials"
          href="/material"
        />
        <SidebarItem
          icon={
            <MaterialIcon
              className="text-warning"
              fill="currentColor"
              size={30}
            />
          }
          text="Materials"
          href="/material"
        />
      </Sidebar>
    </div>
  );
}
