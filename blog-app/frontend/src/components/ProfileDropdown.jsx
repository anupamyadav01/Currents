import { ToggleLeft, Settings, HelpCircle, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

function ProfileDropdown({ handleLogout }) {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <div className="absolute top-0 right-0 w-72 overflow-hidden rounded-lg border border-gray-100 bg-white text-sm text-gray-700 shadow-xl select-none">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xl font-semibold text-white">
          S
        </div>
        <div className="overflow-hidden">
          <h4 className="truncate font-medium text-gray-900">{user?.name}</h4>
          <a
            href="#profile"
            className="text-xs text-gray-500 transition hover:text-gray-800"
          >
            View profile
          </a>
        </div>
      </div>

      {/* Nav List */}
      <div className="border-t border-gray-100 py-2">
        <a
          href="#appearance"
          className="flex items-center justify-between px-4 py-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <div className="flex items-center gap-3">
            <ToggleLeft className="h-5 w-5 stroke-[1.75] text-gray-500" />
            <span>Appearance</span>
          </div>
          <span className="rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-[11px] font-medium text-gray-600">
            Beta
          </span>
        </a>
        <a
          href="#settings"
          className="flex items-center gap-3 px-4 py-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <Settings className="h-5 w-5 stroke-[1.75] text-gray-500" />
          <span>Settings</span>
        </a>
        <a
          href="#help"
          className="flex items-center gap-3 px-4 py-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <HelpCircle className="h-5 w-5 stroke-[1.75] text-gray-500" />
          <span>Help</span>
        </a>
      </div>

      {/* Membership */}
      <div className="border-t border-gray-100 py-2">
        <a
          href="#membership"
          className="flex items-center justify-between px-4 py-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <span>Become a member</span>
          <Sparkles className="h-4 w-4 fill-amber-500 text-amber-500" />
        </a>
        <a
          href="#partner-program"
          className="block px-4 py-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          Join the Partner Program
        </a>
      </div>

      {/* Sign Out */}
      <div className="cursor-pointer border-t border-gray-100 px-4 py-3 transition hover:bg-gray-50">
        <button onClick={handleLogout} className="font-medium text-gray-700">
          Sign out
        </button>
        <div className="mt-0.5 truncate text-xs text-gray-400">
          sm•••••••••@gmail.com
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50/50 p-4">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-gray-400">
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#blog" className="hover:underline">
            Blog
          </a>
          <a href="#careers" className="hover:underline">
            Careers
          </a>
          <a href="#privacy" className="hover:underline">
            Privacy
          </a>
          <a href="#terms" className="hover:underline">
            Terms
          </a>
          <a href="#tts" className="hover:underline">
            Text to speech
          </a>
          <a href="#more" className="hover:underline">
            More
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
