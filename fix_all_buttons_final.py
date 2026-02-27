import os
import re
import time

# User's requested button style
TARGET_CLASSES = "w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform"

# Root directory
ROOT_DIR = r"c:\Users\soufyane\Desktop\essai 22 stick stitch designe only cafz qr\stitch_caf_menu_table_12"

def fix_file_content(content, file_type):
    original_content = content
    
    # Regex to find buttons calling addToCart
    # We want to match: <button ... addToCart(...) ... > ... </button>
    # This regex needs to be robust for both HTML and JS template strings.
    
    # Pattern explanation:
    # <button\s+                                     # Start of tag
    # (?:[^>]*?)                                     # Any attributes (non-greedy)
    # onclick=["'](?:event\.stopPropagation\(\);\s*)?addToCart\((?:[^"'\)]*|['"][^"']*['"])\)["']  # onclick attribute with addToCart, handling optional event.stopPropagation()
    # (?:[^>]*?)                                     # Any other attributes
    # >                                              # End of opening tag
    # (.*?)                                          # Inner content (non-greedy)
    # </button>                                      # End tag
    
    # Note: We need to capture the argument of addToCart to preserve it.
    
    # Let's try a slightly different approach: Find the whole tag, extract the addToCart call, then rebuild it.
    
    pattern = re.compile(
        r'<button\s+[^>]*onclick=["\']((?:event\.stopPropagation\(\);\s*)?addToCart\([^"\']*(?:[\'"][^"\']*[\'"][^"\']*)*\))["\'][^>]*>.*?</button>',
        re.IGNORECASE | re.DOTALL
    )
    
    def replace_button(match):
        # Extract the onclick value (the function call)
        onclick_val = match.group(1)
        
        # Determine the content. User wants "ADD".
        # However, for JS files, we might want to keep the template literal if it was there?
        # User said: "Button HTML: <button ...>ADD</button>"
        # So we will force "ADD".
        
        # Construct the new button
        return f'<button class="{TARGET_CLASSES}" onclick="{onclick_val}">ADD</button>'

    new_content = pattern.sub(replace_button, content)
    
    # Also fix the case where class is first and onclick is second (the regex above should handle it due to [^>]* before and after onclick)
    
    # Special handling for JS files where the content might be split across lines or use different quoting
    if file_type == 'js':
        # In JS template strings, we might have newlines. The DOTALL flag handles that.
        pass

    return new_content

def update_cache_busting(content):
    # Update script.js?v=... to force reload
    timestamp = int(time.time())
    # Match src="script.js?v=..." or src="./script.js?v=..."
    # Also match src="../script.js?v=..." if it exists
    return re.sub(r'src="(\.?\.?/?)script\.js\?v=\d+"', f'src="\\1script.js?v={timestamp}"', content)

def main():
    print(f"Scanning {ROOT_DIR}...")
    count = 0
    
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            lower_file = file.lower()
            
            if lower_file == 'index.html':
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = fix_file_content(content, 'html')
                    new_content = update_cache_busting(new_content)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated HTML: {file_path}")
                        count += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

            elif lower_file == 'script.js':
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = fix_file_content(content, 'js')
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated JS: {file_path}")
                        count += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    main()
